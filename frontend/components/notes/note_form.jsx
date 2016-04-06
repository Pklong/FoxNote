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

    setHeader: function() {
        if (this.props.params.noteId === 'new') {
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
        var header = this.setHeader();
        return (
            <div className='note-form-container'>
                {header}
                <NoteView noteId={this.state.noteId} />
            </div>
        );
    }
});

module.exports = NoteForm;
