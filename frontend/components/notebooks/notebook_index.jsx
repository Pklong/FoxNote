var React = require('react'),
    NotebooksApi = require('../../utils/notebooks_util'),
    NotesApi = require('../../utils/notes_util'),
    NotebookStore = require('../../stores/notebook'),
    NotebookIndexItem = require('./notebook_index_item'),
    NotebookActions = require('../../actions/notebook_actions'),
    NotebookViewHeader = require('./notebook_view_header');

var NotebookIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {notebooks: NotebookStore.all()};
  },

  componentDidMount: function() {
    this.notebookListener = NotebookStore.addListener(this._notebookChange);
  },

  componentWillUnmount: function() {
    this.notebookListener.remove();
  },

  _handleDelete: function(notebookId) {
    if (this.state.notebooks.length === 1) {
      //TO DO FLASH WARNING!
      console.log("can't delete last notebook");
    } else {
      NotebooksApi.removeNotebook(notebookId);
      if (NotebookStore.currentNotebook().id === notebookId) {
        NotebookActions.receiveCurrentNotebook(null);
      }

      //Check to see if deleted notebook contains a currently shown note
      if (this.props.params.noteId) {
        var shownNoteId = parseInt(this.props.params.noteId);
        for (var i = 0, n = this.state.notebooks.length; i < n; i++) {
          var noteIds = this.state.notebooks[i].noteIds;
          if (noteIds.includes(shownNoteId)) {
            this.context.router.push("/home");
          }
        }
      }
    }
    NotesApi.fetchAllNotes();
    this.props.closeInitialModal();
  },

  _handleSelection: function(notebook) {
    NotebookActions.receiveCurrentNotebook(notebook);
    var router = this.context.router;
    var notebookId = notebook.id;
    if (notebook.noteIds.length > 0) {
      var firstNote = notebook.noteIds[0];
      router.push("/home/notes/" + firstNote);
    } else {
      router.push("/home");
    }
  },

  _notebookChange: function() {
    this.setState({notebooks: NotebookStore.all()});
  },

  render: function() {

    var notebooks = this.state.notebooks.map(function(notebook, i) {
      return <NotebookIndexItem selectNotebook={this._handleSelection}
                                delete={this._handleDelete}
                                closeModal={this.props.closeInitialModal}
                                key={notebook.id}
                                notebook={notebook} />;
                            }.bind(this));

    return (
      <div className='notebook-view'>
        <NotebookViewHeader closeFirstModal={this.props.closeInitialModal} />
        <ul>
          {notebooks}
        </ul>
      </div>
    );
  }
});

module.exports = NotebookIndex;
