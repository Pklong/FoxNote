var React = require('react'),
    NoteStore = require('../../stores/note'),
    NotesApi = require('../../utils/notes_util'),
    NotebookApi = require('../../utils/notebooks_util'),
    NotebookStore = require('../../stores/notebook');

var NoteView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    var note = NoteStore.find(this.props.params.noteId);
    if (!note) {return {title:"", body: "", notebook_id: null, notebooks: NotebookStore.all()};}
    return {
      title: note.title,
      body: note.body,
      notebook_id: note.notebook_id,
      notebooks: NotebookStore.all()
    };
  },

  componentDidMount: function() {
    this.noteListener = NoteStore.addListener(this._noteChange);
    this.notebookListener = NotebookStore.addListener(this._notebookChange);
    NotebookApi.fetchAllNotebooks();
    NotesApi.fetchSingleNote(this.props.params.noteId);
  },

  componentWillUnmount: function() {
    this.noteListener.remove();
    this.notebookListener.remove();
  },

  _noteChange: function () {
    var note = NoteStore.find(this.props.params.noteId);
    if (note) {
      this.setState(
        {
          title: note.title,
          body: note.body,
          notebook_id: note.notebook_id,
        }
      );
    } else {
      this.context.router.push("/home");
    }
  },
  _notebookChange: function() {
    this.setState({notebooks: NotebookStore.all()});
  },

  handleBodyChange: function(e) {
    this.setState({body:e.target.value});
  },

  handleTitleChange: function(e) {
    this.setState({title:e.target.value});
  },
  handleNotebookChange: function(e) {
    this.setState({notebook_id: e.target.value});
  },

  componentWillReceiveProps: function(newProps) {
    NotesApi.fetchSingleNote(newProps.params.noteId);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var updatedNote = {
      id: this.props.params.noteId,
      title: this.state.title,
      body: this.state.body,
      notebook_id: this.state.notebook_id
    };
    NotesApi.updateNote(updatedNote, function (newNoteId) {
        this.context.router.push("/home/notes/" + newNoteId);
    }.bind(this));
  },

  render: function() {
    if (!this.state.notebook_id) { return <p>loading notebooks...</p>; }

        var notebookDropdown = NotebookStore
                                .all()
                                .map(function(notebook) {
                                    return <option key={notebook.id}
                                                   value={notebook.id}>
                                                   {notebook.title}
                                               </option>;
                                            });
    return (
      <form className='note-form' onSubmit={this.handleSubmit}>
        <select value={this.state.notebook_id}
                        onChange={this.handleNotebookChange}>
                    {notebookDropdown}
                </select>
              <input
                  htmlFor="title"
                  className='note-form-title'
                  type='text'
                  placeholder='Title'
                  value={this.state.title}
                  onChange={this.handleTitleChange} />
              <textarea
                  htmlFor="body"
                  className='note-form-body'
                  type='text'
                  value={this.state.body}
                  placeholder='just start typing...'
                  onChange={this.handleBodyChange}
                   />
              <input
                  className='note-form-submit'
                  type='submit'
                  value='Edit Your Note' />
          </form>
    );
  }
});

module.exports = NoteView;
