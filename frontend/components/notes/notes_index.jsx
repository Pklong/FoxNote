var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    NotebooksApi = require('../../utils/notebooks_util'),
    NoteIndexItem = require('./note_index_item'),
    NoteStore = require('../../stores/note'),
    NotebookStore = require('../../stores/notebook');

var NotesIndex = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {notes: []};
    },
    componentWillMount: function() {
        this.noteListener = NoteStore.addListener(this._noteChange);
        NotesApi.fetchAllNotes();
    },
    componentWillUnmount: function() {
        this.noteListener.remove();
    },
    _noteChange: function() {
        var notebook = NotebookStore.currentNotebook();
        if (notebook) {
            this.setState({notes:NoteStore.currentNotebookNotes(notebook.id)});
        } else {
            this.setState({notes: NoteStore.all()});
        }
    },

    render: function () {
        var active,
            notebook;
        if (NotebookStore.currentNotebook()) {
            notebook = NotebookStore.currentNotebook().title;
        } else {
            notebook = "All Notes";
        }

        var notes = this.state.notes.map(function(note, i) {
            active = (i === 0);
            return  (
                <NoteIndexItem
                    className='note-index-item'
                    key={note.id}
                    note={note}
                    activeNote={active} />
            );
        });
        return (
            <article className='note-view'>
                <h3 className='notes-header-title'>{notebook}</h3>
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
