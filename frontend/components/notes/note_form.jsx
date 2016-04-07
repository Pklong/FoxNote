var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    NoteStore = require('../../stores/note'),
    NotebookStore = require('../../stores/notebook'),
    NoteActions = require('../../actions/note_actions'),
    NotebookApi = require('../../utils/notebooks_util'),
    NoteView = require('./note_view');

var NoteForm = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        var note = {title: "", body: "", body_delta: '{"ops":[{"insert":""}]}'};
        return {note: note, notebooks: []};
    },

    componentWillReceiveProps: function (newProps) {
        this.setState({note: NoteStore.find(newProps.params.noteId)});
    },

    componentWillUnmount: function() {
      this.noteListener.remove();
      this.notebookListener.remove();
    },

    _noteChange: function() {
        this.setState({note: NoteStore.find(this.props.params.noteId)});
    },

    _notebookChange: function() {
        this.setState({notebooks: NotebookStore.all()});
    },

    componentDidMount: function() {
        this.noteListener = NoteStore.addListener(this._noteChange);
        this.notebookListener = NotebookStore.addListener(this._notebookChange);
        if (this.props.params) {
            // NoteForm is a Route component for editing note
            NotesApi.fetchSingleNote(this.props.params.noteId);
        }
        NotebookApi.fetchAllNotebooks();
    },

    setHeader: function() {
        if (this.props.newNote) {
            return (
                <div className='new-note-form-header'>
                    <div className='note-form-submit'>Create Note</div>
                    <div className='note-form-cancel'>Cancel</div>
                </div>
            );
        } else {
            return (
                <div className='note-form-header'></div>
            );
        }
    },

    render: function () {
        if (this.state.notebooks.length < 1) {
            return <p>Loading...</p>;
        }

        var header = this.setHeader();
        return (
            <div className='note-form-container'>
                {header}
                <NoteView newNote={this.props.newNote}
                          notebooks={this.state.notebooks}
                          note={this.state.note} />
            </div>
        );
    }
});

module.exports = NoteForm;
