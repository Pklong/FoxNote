var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    NoteIndexItem = require('./note_index_item'),
    NoteStore = require('../../stores/note');

var NotesIndex = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return { notes: NoteStore.all(), notebooks: null };
    },
    componentDidMount: function() {
        this.noteListener = NoteStore.addListener(this._noteChange);
        NotesApi.fetchAllNotes();
    },
    componentWillUnmount: function() {
        this.noteListener.remove();
    },
    _noteChange: function() {
        this.setState({notes: NoteStore.all()});
    },
    render: function () {
        if (this.state.notes === undefined) {
            return <p>"Loading Notes..."</p>;
        }

        var active;
        var notes = this.state.notes.map(function(note, i) {
            active = (i === 0);
            return <NoteIndexItem className='note-index-item'
                                  key={note.id}
                                  note={note}
                                  activeNote={active} />;
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
