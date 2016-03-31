var React = require('react'),
    NavBar = require('./navbar/navbar'),
    NoteForm = require('./notes/note_form'),
    NotesIndex = require('./notes/notes_index');


module.exports = React.createClass({
  render: function () {
    return (
      <div className='container group'>
        <NavBar />
        <NotesIndex />
        <NoteForm />
        {this.props.children}
      </div>
    );
  }
});
