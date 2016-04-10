var AppDispatcher = require('../dispatcher/dispatcher'),
    NoteConstants = require('../constants/note_constants');

var NoteActions = {
    receiveAllNotes: function(notes) {
        AppDispatcher.dispatch({
            actionType: NoteConstants.RECEIVE_ALL_NOTES,
            notes: notes
        });
    },
    // receiveSingleNote: function(note) {
    //     AppDispatcher.dispatch({
    //         actionType: NoteConstants.RECEIVE_SINGLE_NOTE,
    //         note: note
    //     });
    // },
    receiveCurrentNote: function(note) {
        AppDispatcher.dispatch({
            actionType: NoteConstants.RECEIVE_CURRENT_NOTE,
            note: note
        });
    },
    removeNote: function(note) {
        AppDispatcher.dispatch({
            actionType: NoteConstants.REMOVE_NOTE,
            note: note
        });
    },
    createNote: function(note) {
        AppDispatcher.dispatch({
            actionType: NoteConstants.CREATE_NOTE,
            note: note
        });
    },
    updateNote: function(note) {
        AppDispatcher.dispatch({
            actionType: NoteConstants.UPDATE_NOTE,
            note: note
        });
    }
};

module.exports = NoteActions;
