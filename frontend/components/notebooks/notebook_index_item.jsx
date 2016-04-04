var React = require('react'),
    NotebookActions = require('../../actions/notebook_actions');

var NotebookIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleClick: function() {
    NotebookActions.receiveCurrentNotebook(this.props.notebook);
    this.props.closeModal();
  },
  render: function() {
    return (
      <li className='notebook-index-item'
          onClick={this.handleClick}>
        <h3 className='notebook-index-item-title'>
          {this.props.notebook.title}
        </h3>
        <p className='notebook-index-item-notecount'>
          {this.props.notebook.note_count}
        </p>
      </li>
    );
  }

});

module.exports = NotebookIndexItem;
