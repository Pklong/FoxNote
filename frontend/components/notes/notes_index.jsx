var React = require('react'),
    NotesApiUtil = require('../../utils/notes_api_util'),
    NoteStore = require('../../stores/notes/note');

var NotesIndex = React.createClass({
    getInitialState: function() {
        return {notes: NoteStore.all()};
    },

    _onChange: function () {
        this.setState({notes: NoteStore.all()});
    },

    componentDidMount: function() {
        this.noteListener = NoteStore.addListener(this._onChange);
        NotesApiUtil.fetchAllNotes();
    },
    componentWillUnmount: function() {
        this.noteListener.remove();
    },
    render: function () {
        var notes = this.state.notes.map(function(note) {
            return <li key={note.updated_at}>{note.title}</li>;
        });
        
        return (
            <ul className='note-index'>
                {notes}
            </ul>
        );
    }
});


module.exports = NotesIndex;
