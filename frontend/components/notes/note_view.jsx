var React = require('react'),
    NoteStore = require('../../stores/note'),
    NotesApi = require('../../utils/notes_util'),
    NotebookApi = require('../../utils/notebooks_util'),
    NotebookStore = require('../../stores/notebook'),
    Quill = require('react-quill'),
    NoteToolbar = require('./note_toolbar');

var NoteView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      note: NoteStore.find(parseInt(this.props.params.noteId)),
      notebooks: null
    };
  },

  componentWillMount: function() {
    this.noteListener = NoteStore.addListener(this._noteChange);
    this.notebookListener = NotebookStore.addListener(this._notebookChange);
    NotesApi.fetchSingleNote(this.props.params.noteId);
    NotebookApi.fetchAllNotebooks();
  },

  componentWillUnmount: function() {
    this.noteListener.remove();
    this.notebookListener.remove();
  },

  componentDidMount: function() {
    // var _editor = new Quill('#editor', {
    //   modules: {
    //     'toolbar': { container: '#toolbar' }
    //   },
    //   theme: 'snow'
    // });
  },

  _noteChange: function () {
    this.setState({note: NoteStore.find(parseInt(this.props.params.noteId))});
  },
  _notebookChange: function() {
    this.setState({notebooks: NotebookStore.all()});
  },

  handleBodyChange: function(value) {
    var body = value;
    var updatedNote = this.state.note;
    updatedNote['body'] = body;
    this.setState({note: updatedNote});
  },

  handleTitleChange: function(e) {
    var title = e.target.value;
    var updatedNote = this.state.note;
    updatedNote['title'] = title;
    this.setState({note: updatedNote});
  },
  _handleNotebookChange: function(e) {
    this.setState({notebook_id: e.target.value});
  },

  componentWillReceiveProps: function(newProps) {
    NotesApi.fetchSingleNote(newProps.params.noteId);
  },

  handleSubmit: function(e) {
    e.preventDefault();

    NotesApi.updateNote(this.state.note, function (newNoteId) {
        this.context.router.push("/home/" + newNoteId);
    }.bind(this));
  },

  render: function() {
    if (!this.state.note || !this.state.notebooks) {return <p>Loading...</p>;}

    return (
      <div className='note-container'>

        <NoteToolbar
          handleNotebookChange={this._handleNotebookChange}
          notebooks={NotebookStore.all()}
          myNotebookId={this.state.notebook_id}/>

        <form className='note-form' onSubmit={this.handleSubmit}>

          <input
            htmlFor='title'
            className='note-form-title'
            placeholder='Title your note'
            value={this.state.note.title}
            onChange={this.handleTitleChange} />
          <Quill
            theme='snow'
            value={this.state.note.body}
            onChange={this.handleBodyChange} />

          <input
            className='note-form-submit'
            type='submit'
            value='Edit Your Note' />

        </form>
      </div>
    );
  }
});

module.exports = NoteView;
