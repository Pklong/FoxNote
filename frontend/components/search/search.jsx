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
    NoteApi.fetchCurrentNote(note.id);

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
    var type;
    return SearchStore.all().map(function (result, i) {
      if (result._type === 'Note') {
        type = "note";
        return (
          <div key={ result.id + result.title + i } className='search-index-item'>
            <SearchIndexItem
              searchClick={this._handleNoteClick}
              note={result}
               />
            <span className='search-index-item-spec'>
              {type + " updated " + result.updated_at + " ago"}
            </span>
          </div>
        );
      } else {
        type = "notebook";
        return (
          <div key={ result.id + result.title + i } className='search-index-item'>
            <SearchIndexItem
              searchClick={this._handleNotebookClick}
              notebook={result}
               />
            <span className='search-index-item-spec'>
              {type + " contains " + result.note_count + " notes"}
            </span>
          </div>
        );
      }
    }.bind(this));
  },

  render: function() {
    // var meta = SearchStore.meta(),
    //     metaMsg;
    //     nextPageDisabled,
    //     buttonMsg;

    // if (!meta.page) {
    //   metaMsg = "Search Notes and Notebooks!";
    //   nextPageDisabled = true;
    //   buttonMsg = "";
    // } else if (meta.total_pages < meta.page) {
    //   metaMsg = "No results found...";
    //   nextPageDisabled = true;
    //   buttonMsg = "";
    // } else if (meta.total_pages > meta.page) {
    //   metaMsg = "Displaying page " + meta.page + " of " + meta.total_pages;
    //   nextPageDisabled = false;
    //   buttonMsg = "More Results!";
    // } else {
    //   metaMsg = "Displaying page " + meta.page + " of " + meta.total_pages;
    //   nextPageDisabled = true;
    //   buttonMsg = "That's all!";
    // }
    // {metaMsg}
    // <button
    //   disabled={nextPageDisabled}
    //   onClick={ this.nextPage }>{buttonMsg}</button>
    // <nav>
    // </nav>

    return (
      <article className='search-container'>
        <input className='search-input'
               type='text'
               placeholder='Search text of notes and notebooks'
               onChange={this.handleInputChange} />

             <ul className='results-container'>
          { this.results() }
        </ul>
      </article>
    );
  }
});

module.exports = Search;
