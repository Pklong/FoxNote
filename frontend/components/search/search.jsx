var React = require('react'),
    SearchStore = require('../../stores/search'),
    SearchApi = require('../../utils/search_util'),
    NotebookApi = require('../../utils/notebooks_util'),
    NotebookActions = require('../../actions/notebook_actions'),
    NoteApi = require('../../utils/notes_util'),
    SearchIndexItem = require('./search_index_item');

var Search = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {query: ""};
  },

  componentDidMount: function() {
    this.searchListener = SearchStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.searchListener.remove();
  },

  _onChange: function() {
    this.setState({results: SearchStore.all()});
  },

  _handleNoteClick: function (searchItem) {
    var note = searchItem.note;
    NotebookActions.receiveCurrentNotebook(null);
    NoteApi.fetchSingleNote(note.id);

    this.context.router.push("/home/notes/" + note.id);

    this.props.closeModal();
  },

  _handleNotebookClick: function(searchItem) {
    var notebook = searchItem.notebook;
    var notebookNoteIds = notebook.noteIds;
    var router = this.context.router;

    NotebookActions.receiveCurrentNotebook(notebook);

    if (notebookNoteIds.length > 0) {
      router.push("/home/notes/" + notebookNoteIds[0]);
    } else {
      router.push("/home");
    }

    this.props.closeModal();
  },

  handleInputChange: function(e) {
    var query = e.currentTarget.value;
    this.setState({query: query}, function () {
      this.search();
    }.bind(this));
  },

  search: function() {
    SearchApi.search(this.state.query, 1);
  },

  nextPage: function () {
    var meta = SearchStore.meta();
    SearchApi.search(meta.query, meta.page + 1);
  },

  results: function() {
    return SearchStore.all().map(function (result, i) {
      if (result._type === 'Note') {
        return (
          <SearchIndexItem
              className='note-index-item'
              searchClick={this._handleNoteClick}
              note={result}
              key={ result.id + " note " + i } />
        );
      } else {
        return (
          <SearchIndexItem
            className='note-index-item'
            searchClick={this._handleNotebookClick}
            notebook={result}
            key={ result.id + " notebook " + i } />
        );
      }
    }.bind(this));
  },

  render: function() {
    var meta = SearchStore.meta(),
        metaMsg,
        nextPageDisabled,
        buttonMsg;

    if (!meta.page) {
      metaMsg = "Search Notes and Notebooks!";
      nextPageDisabled = true;
      buttonMsg = "";
    } else if (meta.total_pages < meta.page) {
      metaMsg = "No results found...";
      nextPageDisabled = true;
      buttonMsg = "";
    } else if (meta.total_pages > meta.page) {
      metaMsg = "Displaying page " + meta.page + " of " + meta.total_pages;
      nextPageDisabled = false;
      buttonMsg = "More Results!";
    } else {
      metaMsg = "Displaying page " + meta.page + " of " + meta.total_pages;
      nextPageDisabled = true;
      buttonMsg = "That's all!";
    }

    return (
      <article>
        <input type='text'
               placeholder='Search text of notes and notebooks'
               onChange={this.handleInputChange} />
        <nav>
          {metaMsg}
          <button
            disabled={nextPageDisabled}
            onClick={ this.nextPage }>{buttonMsg}</button>
        </nav>

        <ul>
          { this.results() }
        </ul>
      </article>
    );
  }
});

module.exports = Search;
