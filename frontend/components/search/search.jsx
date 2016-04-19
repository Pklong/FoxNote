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
    window.setTimeout(function() {
      this.refs.searchInput.focus();
    }.bind(this), 500);
  },

  componentWillUnmount: function() {
    this.searchListener.remove();
    SearchStore.clear();
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
    var router = this.context.router;

    NotebookActions.receiveCurrentNotebook(notebook);

    router.push("/home");

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
          <div key={ result.title + i } className='search-index-item'>
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
          <div key={ result.title + i } className='search-index-item'>
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
    return (
      <article className='search-container'>
        <input className='search-input'
               type='text'
               ref='searchInput'
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
