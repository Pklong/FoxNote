var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    NotebooksApi = require('../../utils/notebooks_util'),
    NoteIndexItem = require('./note_index_item'),
    NoteStore = require('../../stores/note'),
    NotebookStore = require('../../stores/notebook'),
    currentView = 'notes',
    title = 'notes',
    NotebookFilter = false;

var NotesIndex = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {notes: this.getNotes(this.props.filter)};
    },

    componentWillMount: function() {
        this.noteListener = NoteStore.addListener(this._noteChange);
        NotesApi.fetchAllNotes();
        NotebooksApi.fetchAllNotebooks();
    },

    componentWillUnmount: function() {
        this.noteListener.remove();
    },

    _noteChange: function() {
        this.setState({notes: this.getNotes(this.props.filter)});
    },

    componentWillReceiveProps: function (newProps) {
        this.setState({ notes: this.getNotes(newProps)});
    },

    getNotes: function(filter) {
        if (filter.display === 'notebooks') {
            currentView = 'notebooks';
            title = NotebookStore.currentNotebook().title;
            return NoteStore.currentNotebookNotes(filter.id);
        } else {
            currentView = 'notes';
            title = 'notes';
            return NoteStore.all();
        }
    },

    render: function () {
        debugger;
        var active;

        var noteIndexItems = this.state.notes.map(function(note, i) {

            active = (i === 0);

            return  (
                <NoteIndexItem
                    className='note-index-item'
                    key={note.id}
                    note={note}
                    currentView={currentView}
                    viewedNotebook={ NotebookStore.currentNotebook().id }
                    activeNote={active} />
            );
        });

        var noteCount = noteIndexItems.length;

        return (
            <article className='note-view'>
                <h3 className='notes-header-title'>{title}</h3>
                <div className='notes-header'>
                    <span className='notes-count'>{noteCount} notes</span>
                </div>
                <div className='note-scroll-window'>
                    <ul className='note-index-item'>
                        {noteIndexItems}
                    </ul>
                </div>
            </article>
        );
    }
});


module.exports = NotesIndex;
