var React = require('react');

var NoteIndexItem = React.createClass({
  render: function() {
    return (
      <div className='note-index-item-snippet'>
        <h4 className='note-index-item-title'>{this.props.note.title}</h4>
        <p className='note-last-update'>{this.props.note.updated_at} ago</p>
      </div>
    );
  }
});

module.exports = NoteIndexItem;
