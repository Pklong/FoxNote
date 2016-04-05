var React = require('react'),
    ToolbarColors = require('./toolbar_colors');

var NoteToolbar = React.createClass({
  _notebookChange: function(e) {
    this.props.handleNotebookChange(e);
  },

  render: function() {
    if (!this.props.notebooks) {return <p>Loading...</p>;}

    var notebooks = this.props.notebooks.map(function (notebook, key) {
      return (
        <option key={key} value={notebook.id}>{notebook.title}</option>
      );
    });
    
    var dropdown = (
      <select
        onChange={this._notebookChange}
        defaultValue={this.props.notebooks[0].id}
        value={this.props.myNotebookId}>
        {notebooks}
      </select>
    );

    return (
      <div id="toolbar" className="ql-toolbar-container toolbar">
        {dropdown}
        <select
          className="ql-font"
          data-reactid='2'>
          <option value="sans-serif">Sans Serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>
        <span className="ql-format-separator"></span>
        <select
          className="ql-size"
          data-reactid='3'>
          <option value="10px">Small</option>
          <option value="13px">Normal</option>
          <option value="18px">Large</option>
          <option value="32px">Huge</option>
        </select>
        <span className="ql-format-separator"></span>
        <span className="ql-bold ql-format-button"></span>
        <span className="ql-italic ql-format-button"></span>
        <span className="ql-strike ql-format-button"></span>
        <span className="ql-underline ql-format-button"></span>
        <span className="ql-format-separator"></span>
        <span className="ql-link ql-format-button"></span>
        <span className="ql-format-separator"></span>
        <select
          className="ql-background ql-format-button"
          data-reactid='c'>
          {ToolbarColors.map(function (color, key) {
            return (<option key={key} value={color} />);
          })}
        </select>
        <span className="ql-format-separator"></span>
        <select
          className="ql-color ql-format-button"
          data-reactid='e'>
          {ToolbarColors.map(function (color, key) {
            return (<option key={key} value={color} />);
          })}
        </select>
        <span className="ql-format-separator"></span>
        <span className="ql-bullet ql-format-button"/>
        <span className="ql-list ql-format-button"/>
      </div>
    );
  },
});

module.exports = NoteToolbar;
