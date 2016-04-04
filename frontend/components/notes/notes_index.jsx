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
            notes: NoteStore.all(),
            notebook: NotebookStore.currentNotebook()
        };
    },
    componentDidMount: function() {
        this.noteListener = NoteStore.addListener(this._noteChange);
        this.notebookListener = NotebookStore.addListener(this._notebookChange);
        NotesApi.fetchAllNotes();
    },
    componentWillUnmount: function() {
        this.noteListener.remove();
        this.notebookListener.remove();
    },
    _noteChange: function() {
        var currentNotebook = this.state.notebook;
        if (currentNotebook) {
            this.setState({
                notes: NoteStore.currentNotebookNotes(currentNotebook.id)
            });
        } else {
            this.setState({
                notes: NoteStore.all()
            });
        }
    },
    _notebookChange: function() {
        var notebook = NotebookStore.currentNotebook();
        if (notebook) {
            this.setState({
                notes: NoteStore.currentNotebookNotes(notebook.id),
                notebook: notebook
            });
        } else {
            this.setState({
                notes: NoteStore.all(),
                notebook: notebook
            });
        }
    },
    render: function () {
        if (!this.state.notes) {
            return <p>"Loading..."</p>;
        }

        var active,
            notebook;

        var notes = this.state.notes.map(function(note, i) {
            active = (i === 0);
            return <NoteIndexItem className='note-index-item'
                                  key={note.id}
                                  note={note}
                                  activeNote={active} />;
        });
        if (this.state.notebook) {
            notebook = this.state.notebook.title;
        } else {
            notebook = "All Notes";
        }
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
