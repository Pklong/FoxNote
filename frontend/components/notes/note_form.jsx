var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    SessionStore = require('../../stores/session');


var NoteForm = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            title: "",
            body: "",
            notebook_id: 1,
            author_id: SessionStore.currentUser().id
        };
    },
    createNote: function (e) {
        e.preventDefault();
        NotesApi.createNote(this.state, function (newNoteId) {
            this.props.closeModal();
            this.context.router.push("/home/" + newNoteId);
        }.bind(this));
    },
    handleBodyChange: function(e) {
        this.setState({body:e.target.value});
    },
    handleTitleChange: function(e) {
        this.setState({title:e.target.value});
    },
    render: function () {
        return (
            <form className='note-form' onSubmit={this.createNote}>
                <input
                    htmlFor="title"
                    className='note-form-title'
                    type='text'
                    placeholder='Title your note'
                    onChange={this.handleTitleChange} />
                <textarea
                    htmlFor="body"
                    className='note-form-body'
                    type='text'
                    placeholder='just start typing...'
                    onChange={this.handleBodyChange}
                     />
                <input
                    className='note-form-submit'
                    type='submit'
                    value='Create New Note' />
            </form>
        );
    }
});

module.exports = NoteForm;
