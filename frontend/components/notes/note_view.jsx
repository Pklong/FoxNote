var React = require('react'),
    NoteStore = require('../../stores/note'),
    NotesApi = require('../../utils/notes_util'),
    NotebookApi = require('../../utils/notebooks_util'),
    NotebookStore = require('../../stores/notebook'),
    Quill = require('react-quill'),
    Toolbar = require('react-quill').Toolbar,
    _editor,
    // DefaultItems = Toolbar.defaultItems,
    // DefaultColors = Toolbar.defaultColors,
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
    _editor = (
                <Quill theme='snow'>
                  <Toolbar />
                </Quill>
                );
  },

  _handleNoteChange: function () {
    var note = this.state.note;
    var format = _editor.getContents();
    var title = document.getElementsByClassName('note-form-title');
    var notebookId = document.getElementsByClassName('notebookId-dropdown');
    note['body'] = _editor.getText();
    note['body_delta'] = JSON.stringify(format);
    note['title'] = title;
    note['notebook_id'] = notebookId;
    this.setState({note: note});
  },
  _submitNote: function (e) {
    e.preventDefault();
    var note = this.state.note;
    var format = _editor.getContents();
    note['body'] = _editor.getText();
    note['body_delta'] = JSON.stringify(format);
    this.setState({note: note});
    NotesApi.updateNote(this.state.note);
  },

  _noteChange: function () {
    this.setState({note: NoteStore.find(parseInt(this.props.params.noteId))});
  },

  _notebookChange: function() {
    this.setState({notebooks: NotebookStore.all()});
  },

  componentWillReceiveProps: function(newProps) {
    NotesApi.fetchSingleNote(newProps.params.noteId);
  },

  render: function() {
    if (!this.state.note || !this.state.notebooks) {return <p>Loading...</p>;}

    var note = this.state.note;
    _editor.setContents

    return (
      <div className='note-container'>


          <input
            htmlFor='title'
            className='note-form-title'
            placeholder='Title your note'
            value={this.state.note.title}
            onChange={this._handleNoteChange} />

          <NoteToolbar
            editor={_editor}
            handleNotebookChange={this._handleNoteChange}
            notebooks={this.state.notebooks}
            myNotebookId={this.state.note.notebook_id}/>

          <button
            onClick={this._submitNote}
            className='note-form-submit'
            value='Edit Note' />

      </div>
    );
  }
});

module.exports = NoteView;
