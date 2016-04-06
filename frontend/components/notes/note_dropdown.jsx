var React = require('react');

var NoteDropdown = React.createClass({

  _notebookChange: function(e) {
    this.props._updateNotebookId(e);
  },

  render: function() {
    if (!this.props.notebooks) {return <p>Loading...</p>;}

    var notebooks = this.state.notebooks.map(function (notebook, key) {
      return (
        <option key={key} value={notebook.id}>{notebook.title}</option>
      );
    });

    return (
      <select
        className='notebookId-dropdown'
        onChange={this._notebookChange}
        defaultValue={this.props.notebooks[0].id}
        value={this.props.myNotebookId}>
        {notebooks}
      </select>
    );
  },
});

module.exports = NoteDropdown;
