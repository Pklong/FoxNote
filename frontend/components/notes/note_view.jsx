var React = require('react'),
    NoteStore = require('../../stores/note'),
    NotesApi = require('../../utils/notes_util'),
    NotebookApi = require('../../utils/notebooks_util'),
    NotebookStore = require('../../stores/notebook'),
    Quill = require('react-quill').Quill,
    NoteToolbar = require('./note_toolbar'),
    cursor;

var NoteView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
      return {note: this.props.note};
  },

  componentDidMount: function() {
    this.setUpEditor();
    this.noteListener = NoteStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.noteListener.remove();
  },

  _onChange: function(noteArg, noteChange) {
    var note = noteArg || NoteStore.find(this.props.note.id);
    cursor = this._editor.getSelection();
    this._editor.setContents(JSON.parse(note.body_delta));

    if (noteChange || !cursor) {
      // editor is working on a new note or mounting, move cursor to end
      var endOfNote = this._editor.getLength();
      this._editor.setSelection(endOfNote, endOfNote);
    } else {
      // editor preserves cursor location through edit
      this._editor.setSelection(cursor.start, cursor.end);
    }
  },

  setUpEditor: function() {
    this._editor = new Quill('#editor', {
      modules: {
        'toolbar': { container: '#toolbar' }
      },
      theme: 'snow'
    });

    this._editor.on('text-change', function(delta, source) {
      // Quill can receive text-changes from APIs, we need to specify user
      if (source === 'user') {
        this._handleBodyChange();
      }
    }.bind(this));

    this._editor.setContents(JSON.parse(this.state.note.body_delta));
  },

  _handleTitleChange: function(e) {
    var note = this.state.note;
    note['title'] = e.target.value;
    this.setState({note: note}, this.editNote());
  },

  _handleBodyChange: function() {
    this.editNote();
  },

  _notebookChange: function(e) {

    var note = this.state.note;
    note.notebook_id = parseInt(e.target.value);
    this.setState({ note: note });
    this.editNote();
  },

  editNote: function() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(function() {
      var noteId = this.state.note.id;
      var note = {
        title: this.state.note.title,
        body: this._editor.getText(),
        body_delta: JSON.stringify(this._editor.getContents()),
        notebook_id: this.getDropdownNotebookId()
      };
      NotesApi.updateNote(note, noteId);
    }.bind(this), 1000);
  },

  getDropdownNotebookId: function() {
    return document.getElementById('notebook-select').value;
  },

  notebookDropdown: function () {
    var notebooks = this.props.notebooks.map(function (notebook, key) {
      return (
        <option key={key} value={notebook.id}>{notebook.title}</option>
      );
    });
    var value = this.state.note.notebook_id;

    return (
      <span>
        <span className='note-editor-notebooks-label'>
        </span>
        <select
          id='notebook-select'
          onChange={this._notebookChange}
          defaultValue={this.props.notebooks[0].id}
          value={value}>
          {notebooks}
        </select>
      </span>
    );
  },

  componentWillReceiveProps: function(newProps) {
    // prevents an update if user switched before timeout expired
    if (this.timer) {
      clearTimeout(this.timer);
    }

    var noteChange = newProps.note.id !== this.state.note.id;

    this.setState({note: newProps.note}, function() {
      this._onChange(newProps.note, noteChange);
    }.bind(this));
  },

  render: function() {

    var toolbar = <NoteToolbar dropdown={this.notebookDropdown()} />;
    var input =  <input
                    htmlFor="title"
                    className='note-form-title'
                    type='text'
                    placeholder='Title your note'
                    value={this.state.note.title}
                    onChange={this._handleTitleChange} />;

    return (
      <div className='note-form'>
        {toolbar}
        {input}
        <div id='editor'></div>
      </div>
    );
  }
});

module.exports = NoteView;
