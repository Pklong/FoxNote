var React = require('react'),
    NoteApiUtil = require('../../utils/notes_util'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');


var NoteForm = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function() {
        return {
            title: "",
            body: ""
        };
    },
    createNote: function (e) {
        e.preventDefault();
        var note = {
            title: this.state.title,
            body: this.state.body,
            notebook_id: 1, //PLACEHOLDER UNTIL I HAVE NOTEBOOKS!
            author_id: 1
        };

        NoteApiUtil.createNote(note, function () {
            console.log("made a new note!");
        });
    },
    render: function () {
        return (
            <form className='note-form' onSubmit={this.createNote}>
                <input
                    className='note-form-title'
                    type='text'
                    placeholder='Title your note'
                    valueLink={this.linkState('title')} />
                <textarea
                    className='note-form-body'
                    type='text'
                    placeholder='just start typing...'
                    valueLink={this.linkState('body')} />
                <input
                    className='note-form-submit'
                    type='submit'
                    value='Create New Note' />
            </form>
        );
    }
});

module.exports = NoteForm;
