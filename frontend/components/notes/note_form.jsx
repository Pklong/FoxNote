var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    NoteView = require('./note_view');

var NoteForm = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return { noteId: this.props.params.noteId };
    },

    componentWillReceiveProps: function (newProps) {
        this.setState( {noteId: newProps.params.noteId });
    },

    render: function () {
        return (
            <div className='note-form-container'>
                <NoteView noteId={this.state.noteId} />
            </div>
        );
    }
});

module.exports = NoteForm;
