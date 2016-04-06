var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    NoteStore = require('../../stores/note'),
    NoteActions = require('../../actions/note_actions'),
    NotebookApi = require('../../utils/notebooks_util'),
    NoteView = require('./note_view');

var NoteForm = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {};
    },

    componentWillReceiveProps: function () {
        this.setState(NoteStore.find(this.props.params.noteId));
    },

    componentWillUnmount: function() {
      this.noteListener.remove();
    },

    _noteChange: function() {
        this.setState(NoteStore.find(this.props.params.noteId));
    },

    componentDidMount: function() {
        this.noteListener = NoteStore.addListener(this._noteChange);
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
        debugger;
        var header = this.setHeader();
        return (
            <div className='note-form-container'>
                {header}
                <NoteView note={this.state.note} />
            </div>
        );
    }
});

module.exports = NoteForm;
