var React = require('react'),
    NavBar = require('./navbar/navbar'),
    NotesIndex = require('./notes/notes_index');


module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <NavBar />
        <NotesIndex />
        {this.props.children}
      </div>
    );
  }
});
