var React = require('react'),
    NotesApi = require('../../utils/notes_util'),
    NotebookStore = require('../../stores/notebook'),
    SessionStore = require('../../stores/session');


var NoteBody = React.createClass({
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
            this.context.router.push("/home/notes/" + newNoteId);
        }.bind(this));
    },
    handleBodyChange: function(e) {
        this.setState({body:e.target.value});
    },
    handleTitleChange: function(e) {
        this.setState({title:e.target.value});
    },
    handleNotebookChange: function(e) {
        this.setState({notebook_id: e.target.value});
    },
    render: function () {
        var notebookDropdown = NotebookStore.all().map(function(notebook) {
            return <option key={notebook.id}
                           value={notebook.id}>
                           {notebook.title}
                       </option>;
        });

        return (
            <form className='note-form' onSubmit={this.createNote}>
                <select value={this.state.notebook_id}
                        onChange={this.handleNotebookChange}>
                    {notebookDropdown}
                </select>
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

module.exports = NoteBody;
