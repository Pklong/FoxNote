var React = require('react'),
    NoteStore = require('../../stores/note'),
    NotesApi = require('../../utils/notes_util'),
    NotebookApi = require('../../utils/notebooks_util'),
    NotebookStore = require('../../stores/notebook'),
    Quill = require('react-quill').Quill,
    NoteToolbar = require('./note_toolbar'),
    cursor,
    noteFetched = false,
    notebooksFetched = false,
    _editor;

var NoteView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    //note
    return {};
  },

  componentDidMount: function() {
    this.setUpEditor();
  },


  setUpEditor: function() {
    _editor = new Quill('#editor', {
      modules: {
        'toolbar': { container: '#toolbar' }
      },
      theme: 'snow'
    });

    _editor.on('text-change', function(delta, source) {
      // Quill can receive text-changes from APIs, we need to specify user
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
    if (this.props.noteId === 'new') {
      if (!created) {
        created = true;
        var button = document.getElementsByClassName('note-form-submit')[0];
        button.addEventListener('click', function() {
          var note = {
            title: this.state.title,
            body: _editor.getText(),
            body_delta: JSON.stringify(_editor.getContents()),
            notebook_id: this.getDropdownNotebookId()
          };
          NotesApi.createNote(note, function(createdNote) {
            this.context.router.push("home/notes/" + createdNote.id);
            created = false;
          }.bind(this));
        }.bind(this));
      }
    } else {
      this.editNote();
    }
  },

  _notebookChange: function(e) {
    var note = this.state.note;
    note.notebook_id = parseInt(e.target.value);
    this.setState({ note: note });
    if (created) {
      this.editNote();
    }
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
        notebook_id: this.getDropdownNotebookId()
      };
      NotesApi.updateNote(note);
    }.bind(this), 2000);
  },

  getDropdownNotebookId: function() {
    return document.getElementById('notebook-select').value;
  },

  // _noteChange: function () {
  //   this.setFetched();
  //   if (this.props.noteId !== 'new') {
  //     cursor = _editor.getSelection();
  //     var note = NoteStore.find(parseInt(this.props.noteId));
  //     this.setState({ title: note.title, note: note });
  //     if (cursor) {
  //       _editor.setSelection(cursor.start, cursor.end);
  //     }
  //   }
  // },

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
        id='notebook-select'
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
    if (newProps.noteId === 'new') {
      note = {title: "", body: "", body_delta: '{"ops":[{"insert":""}]}'};
    } else {
      note = NoteStore.find(parseInt(newProps.noteId));
    }
    this.setState({note: note, title: note.title});
  },

  render: function() {

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
