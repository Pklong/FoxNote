var React = require('react'),
    NotesUtil = require('../../utils/notes_util'),
    NoteIndexItem = require('./note_index_item'),
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
        NotesUtil.fetchAllNotes();
    },
    componentWillUnmount: function() {
        this.noteListener.remove();
    },
    render: function () {
        var notes = this.state.notes.map(function(note) {
            return <li key={note.id}
                       className='note-index-item'>
                       <NoteIndexItem note={note} />
                   </li>;
        });

        return (
            <article className='note-view'>
                <h3 className='notes-header-title'>notes</h3>
                <div className='notes-header'>
                    <span className='notes-count'>{notes.length} notes</span>
                </div>
                <div className='note-scroll-window'>
                    <ul className='note-index-item'>
                        {notes}
                    </ul>
                </div>
            </article>
        );
    }
});


module.exports = NotesIndex;
