var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    NoteStore = require('../../stores/note');

var NoteIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      note: this.props.note,
      activeNote: this.props.active
    };
  },

  componentWillMount: function() {
    if (this.props.activeNote) {
      this._handleClick();
      // this.context.router.push("/home/" + parseInt(this.props.note.id));
    }
  },
  componentWillUnmount: function() {
    this.noteListener.remove();
  },

  componentDidMount: function() {
    this.noteListener = NoteStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.setState({note: NoteStore.find(this.props.note.id)});
  },

  _selectNote: function(e) {
    e.preventDefault();
    var oldSelected = document.body.querySelectorAll('.activeNote')[0];
    oldSelected.classList.remove('.active-note');
    e.currentTarget.classList.add('.active-note');
    this._handleClick();
  },

  _handleClick: function() {
    var router = this.context.router;
    var noteId = this.state.note.id;
    if (this.props.currentView === 'notebooks') {
      var notebookId = this.state.viewedNotebook;
      router.push("/home/notebook/" + notebookId + "/note/" + noteId );
    } else {
      router.push("/home/note/" + noteId);
    }
  },

  _handleDeleteClick: function(e) {
    e.stopPropagation();
    NotesApi.removeNote(this.props.note.id, function() {
      this.context.router.push("/home");
    }.bind(this));
  },

  render: function() {
    var klass = 'note-index-item-snippet';
    var isActive;
    if (this.props.active) {
      klass += ' active-note';
    }

    return (
      <li  onClick={this._selectNote}
            className={klass}>
        <h4 className='note-index-item-title'>{this.props.note.title}</h4>
        <p className='note-last-update'>{this.props.note.updated_at} ago</p>
        <span className='note-index-item-delete'
              onClick={this._handleDeleteClick}>Delete</span>
      </li>
    );
  }
});

module.exports = NoteIndexItem;
