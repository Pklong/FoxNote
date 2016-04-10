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
        return {
            notes: this.getNotes()};
    },

    componentWillMount: function() {
        this.noteListener = NoteStore.addListener(this._noteChange);
        // NotesApi.fetchAllNotes();
        // NotebooksApi.fetchAllNotebooks();
    },

    componentWillUnmount: function() {
        this.noteListener.remove();
    },

    _noteChange: function() {
        this.setState({notes: this.getNotes()});
    },

    componentWillReceiveProps: function (newProps) {
        this.setState({notes: this.getNotes()});
    },

    getNotes: function() {
        var currentNotebookId = NotebookStore.currentNotebook().id;
        if (currentNotebookId) {
            return NoteStore.currentNotebookNotes(currentNotebookId);
        } else {
            return NoteStore.all();
        }
    },

    _handleDelete: function(deletedNoteId) {
        if (parseInt(this.props.params.noteId) === deletedNoteId) {
            this.context.router.push("/home");
        }
        NotesApi.removeNote(deletedNoteId);
    },

    render: function () {
        var currentNotebook = NotebookStore.currentNotebook(),
            title = (currentNotebook.id) ? currentNotebook.title : "notes",
            shownNoteId = parseInt(this.props.params.noteId),
            selected;

        var noteIndexItems = this.state.notes.map(function(note, i) {
            if (shownNoteId === note.id) {
                selected = true;
            } else {
                selected = false;
            }

            return  (
                <NoteIndexItem
                    key={note.id}
                    note={note}
                    isSelectedNote={selected}
                    deleteNote={this._handleDelete} />
            );
        }.bind(this));

        var noteCount = noteIndexItems.length;

        return (
            <article className='note-view'>
                <h3 className='notes-header-title'>{title}</h3>
                <div className='notes-header'>
                    <span className='notes-count'>{noteCount} notes</span>
                </div>
                <div className='note-scroll-window'>
                    <ul className='note-index-item-container'>
                        {noteIndexItems}
                    </ul>
                </div>
            </article>
        );
    }
});


module.exports = NotesIndex;
