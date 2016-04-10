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
        return this.getNotes();
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
        this.setState(this.getNotes());
    },

    componentWillReceiveProps: function (newProps) {
        this.setState(this.getNotes());
    },

    getNotes: function() {
        var currentNotebookId = NotebookStore.currentNotebook().id;
        if (currentNotebookId) {
            return {notes: NoteStore.currentNotebookNotes(currentNotebookId)};
        } else {
            return {notes: NoteStore.all()};
        }
    },

    _handleDelete: function(deletedNoteId) {
        if (parseInt(this.props.params.noteId) === deletedNoteId) {
            this.context.router.push("/home");
        }
        NotesApi.removeNote(deletedNoteId);
    },

    _swapActive: function(selectedNoteId) {
        debugger;
    },

    render: function () {
        console.log(NoteStore.currentNote().id);
        var currentNotebook = NotebookStore.currentNotebook();
        var title = (currentNotebook.id) ? currentNotebook.title : "notes";
        var active;
        var noteIndexItems = this.state.notes.map(function(note, i) {

            active = (i === 0);

            return  (
                <NoteIndexItem
                    className='note-index-item'
                    key={note.id}
                    note={note}
                    isSelectedNote={active}
                    deleteNote={this._handleDelete}
                    changeActive={this._swapActive} />
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
