var React = require('react');

var NotebookIndexItem = React.createClass({
  selectClick: function(e) {
    e.stopPropagation();
    this.props.selectNotebook(this.props.notebook);
    this.props.closeModal();
  },
  deleteClick: function(e) {
    e.stopPropagation();
    this.props.delete(this.props.notebook.id);
  },
  render: function() {
    return (
      <li className='notebook-index-item'
          onClick={this.selectClick}>
        <h3 className='notebook-index-item-title'>
          {this.props.notebook.title}
        </h3>
        <p className='notebook-index-item-notecount'>
          {this.props.notebook.note_count}
        </p>
        <span className='notebook-index-item-delete'
              onClick={this.deleteClick}>Delete</span>
      </li>
    );
  }

});

module.exports = NotebookIndexItem;
