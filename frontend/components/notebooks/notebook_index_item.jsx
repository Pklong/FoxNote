var React = require('react');

var NotebookIndexItem = React.createClass({
  render: function() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <p>{this.props.note_count}</p>
      </div>
    );
  }

});

module.exports = NotebookIndexItem;
