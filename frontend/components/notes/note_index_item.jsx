var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    NoteActions = require('../../actions/note_actions'),
    NoteStore = require('../../stores/note');

var NoteIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentWillMount: function() {
    if (this.props.isSelectedNote) {
      this._handleClick();
    }
  },

  _selectNote: function(e) {
    e.preventDefault();
    var oldSelected = document.body.querySelectorAll('.active-note')[0];
    if (oldSelected) {
      oldSelected.classList.remove('active-note');
    }
    e.currentTarget.classList.add('active-note');
    this._handleClick();
  },

  _handleClick: function() {
    var router = this.context.router;
    var noteId = this.props.note.id;
    router.push("/home/notes/" + noteId);
  },

  _handleDeleteClick: function(e) {
    e.stopPropagation();
    this.props.deleteNote(this.props.note.id);
  },

  render: function() {
    var klass = 'note-index-item-snippet';
    var active;
    if (this.props.isSelectedNote) {
      klass += ' active-note';
    }

    return (
      <li  onClick={this._selectNote}
            className={klass}>
        <h4 className='note-index-item-title'>{this.props.note.title}</h4>
        <p className='note-last-update'>{this.props.note.updated_at} ago</p>
        <span className='note-index-item-delete'
              onClick={this._handleDeleteClick}></span>
      </li>
    );
  }
});

module.exports = NoteIndexItem;
