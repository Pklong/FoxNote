var React = require('react'),
    NoteStore = require('../../stores/note'),
    NotesApi = require('../../utils/notes_util'),
    NotebookApi = require('../../utils/notebooks_util'),
    NotebookStore = require('../../stores/notebook'),
    Quill = require('react-quill').Quill,
    NoteToolbar = require('./note_toolbar'),
    created = false,
    noteFetched = false,
    notebooksFetched = false,
    _editor;

var NoteView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      noteId: parseInt(this.props.noteId)
    };
  },

  componentWillMount: function() {
    if (!this.props.newNote) {
      NotesApi.fetchSingleNote(this.props.noteId);
    }
    NotebookApi.fetchAllNotebooks();
  },

  componentWillUnmount: function() {
    this.noteListener.remove();
    noteFetched = false;
    notebooksFetched = false;
    created = false;
  },

  componentDidMount: function() {
    this.setUpEditor();
    this.noteListener = NoteStore.addListener(this._noteChange);
  },


  setUpEditor: function() {
    _editor = new Quill('#editor', {
      modules: {
        'toolbar': { container: '#toolbar' }
      },
      theme: 'snow'
    });

    _editor.on('text-change', function(delta, source) {
      if (source === 'user') {
        this._handleBodyChange();
      }
    }.bind(this));
  },

  _handleTitleChange: function(e) {
    this.setState({title: e.target.value});
    if (created) {
      this.editNote();
    }
  },

  _handleBodyChange: function() {
    if (this.props.newNote) {
      if (!created) {
        created = true;
        document.getElementById('submit-note').on('click', function() {
          var selectedNotebookId = this.getNotebookId();
          var note = {
            title: this.state.title,
            body: _editor.getText(),
            body_delta: JSON.stringify(_editor.getContents()),
            notebook_id: selectedNotebookId
          };
          NotesApi.createNote(note, function(createdNote) {
            this.context.router.push("home/" + createdNote.id);
            created = false;
          }.bind(this));
        }.bind(this));
      }
    } else {
      this.editNote();
    }
  },

  getNotebookId: function () {
    var notebookIds = document.getElementById('selected-notebook');
    var id = notebookIds.options[notebookIds.selectedIndex].value;
    return id;
  },

  editNote: function() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(function() {
      var note = {
        id: this.state.note.id,
        title: this.state.title,
        body: _editor.getText(),
        body_delta: JSON.stringify(_editor.getContents()),
        notebook_id: this.getNotebookId()
      };
      NotesApi.editNote(note);
    }.bind(this), 2000);
  },

  _noteChange: function () {
    this.setFetched();
    if (!this.props.newNote) {
      var cursor = _editor.getSelection();
      var note = NoteStore.find(parseInt(this.props.noteId));
      this.setState({ title: note.title, note: note });
      if (cursor) {
        _editor.setSelection(cursor.start, cursor.end);
      }
    }
  },

  setFetched: function () {
    if (NotebookStore.all().length > 0) { notebooksFetched = true; }
    if (NoteStore.all().length > 0) { noteFetched = true; }
  },

  notebookDropdown: function () {
    if (!notebooksFetched) {return;}

    var notebooks = NotebookStore.all().map(function (notebook, key) {
      return (
        <option key={key} value={notebook.id}>{notebook.title}</option>
      );
    });
    var value = noteFetched ? this.state.note.notebook_id : -1;

    return (
      <select
        id='selected-notebook'
        onChange={this._notebookChange}
        defaultValue={NotebookStore.all()[0].id}
        value={value}>
        {notebooks}
      </select>
    );
  },

  buildToolbar: function () {
    if (notebooksFetched) {
      return this.notebookDropdown();
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.setFetched();
    var note;
    if (this.props.newNote) {
      note = {title: "", body: "", body_delta: '{"ops":[{"insert":""}]}'};
    } else {
      note = NoteStore.find(parseInt(newProps.noteId));
    }
    this.setState({note: note, title: note.title});
  },

  render: function() {
    // TO DO document.getElementById('selected Notebook') not working...
    debugger;
    var toolbar = <NoteToolbar dropdown={this.buildToolbar()} />;

    if (noteFetched) {
      _editor.setContents(JSON.parse(this.state.note.body_delta));
    }
    var input =  <input
                    htmlFor="title"
                    className='note-form-title'
                    type='text'
                    placeholder='Title your note'
                    value={this.state.title}
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
