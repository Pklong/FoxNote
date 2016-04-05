var React = require('react'),
    NotesApi = require('../../utils/notes_util');

var NoteIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount: function() {
    if (this.props.activeNote) {
      this.context.router.push("/home/" + parseInt(this.props.note.id));
    }
  },
  handleClick: function(e) {
    this.context.router.push("/home/" + parseInt(this.props.note.id));
  },
  deleteClick: function(e) {
    e.stopPropagation();
    NotesApi.removeNote(this.props.note.id, function() {
      this.context.router.push("/home");
    }.bind(this));
  },
  render: function() {

    return (
      <li  onClick={this.handleClick}
            className='note-index-item-snippet'>
        <h4 className='note-index-item-title'>{this.props.note.title}</h4>
        <p className='note-last-update'>{this.props.note.updated_at} ago</p>
        <span className='note-index-item-delete'
              onClick={this.deleteClick}>Delete</span>
      </li>
    );
  }
});

module.exports = NoteIndexItem;
