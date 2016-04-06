var React = require('react'),
    NoteStore = require('../../stores/note'),
    NotesApi = require('../../utils/notes_util'),
    NotebookApi = require('../../utils/notebooks_util'),
    NotebookStore = require('../../stores/notebook'),
    Quill = require('react-quill'),
    _editor;

var defaultColors = [
  'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
  'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
  'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
  'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
  'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
  'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
  'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
  'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
  'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
  'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
  'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
  'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
];

var NoteView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {

    return {
      noteId: parseInt(this.props.params.noteId),
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
      if (source === 'user') {
        this._handleBodyChange();
      }
    }.bind(this));
  },

  _handleTitleChange: function(e) {
    var note = this.state.note;
    note['title'] = e.target.value;
    this.setState({note: note});
  },

  _handleBodyChange: function(content, delta, source, editor) {
    debugger;
    var note = this.state.note;
    note['body'] = value;
    this.setState({note: note});
  },
  _updateNotebook: function(e) {
    debugger;
  },

  _handleNoteChange: function () {
    var note = this.state.note;
  },

  _submitNote: function (e) {
    e.preventDefault();
    //TO DO!
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


      var textEditor = (
                        <Quill theme='snow'
                               value={this.state.note.body}
                               onChange={this._handleBodyChange}/>
                           );



    return (
      <form className='note-form' onSubmit={this.updateNote}>
              <select value={this.state.note.notebook_id}
                      onChange={this.handleNotebookChange}>
                  {notebookDropdown}
              </select>
              <input
                  htmlFor="title"
                  className='note-form-title'
                  type='text'
                  placeholder='Title your note'
                  onChange={this.handleTitleChange} />
              <textarea
                  htmlFor="body"
                  className='note-form-body'
                  type='text'
                  placeholder='just start typing...'
                  onChange={this.handleBodyChange}
                   />
              <input
                  className='note-form-submit'
                  type='submit'
                  value='Create New Note' />
          </form>
    );
  }
});

module.exports = NoteView;
