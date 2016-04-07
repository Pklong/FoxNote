var React = require('react');

var SearchIndexItem = React.createClass({
  _handleClick: function(e) {
    e.preventDefault();
    this.props.searchClick(this.props);
  },

  render: function () {

    var title = (this.props.note) ?
    this.props.note.title :
    this.props.notebook.title;
    return (
      <div onClick={this._handleClick}>{title}</div>
    );
  },
});

module.exports = SearchIndexItem;
