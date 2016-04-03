var React = require('react');

var NotebookIndexItem = React.createClass({
  render: function() {
    return (
      <div className='notebook-index-item'>
        <h3 className='notebook-index-item-title'>
          {this.props.notebook.title}
        </h3>
        <p className='notebook-index-item-notecount'>
          {this.props.notebook.note_count}
        </p>
      </div>
    );
  }

});

module.exports = NotebookIndexItem;
