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
        var note = NoteStore.find(this.props.params.noteId);
        this.setState({note: note});
    },

    _notebookChange: function() {
        this.setState({notebooks: NotebookStore.all()});
    },

    componentDidMount: function() {
        this.noteListener = NoteStore.addListener(this._noteChange);
        this.notebookListener = NotebookStore.addListener(this._notebookChange);
        NotesApi.fetchSingleNote(this.props.params.noteId);
        NotebookApi.fetchAllNotebooks();
    },


    render: function () {
        if (this.state.notebooks.length < 1) {
            return <p>Loading...</p>;
        }
        return (
            <div className='note-form-container'>
                <NoteView notebooks={this.state.notebooks}
                          note={this.state.note} />
            </div>
        );
    }
});

module.exports = NoteForm;
