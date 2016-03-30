var Store = require('flux/utils').Store,
    AppDispatcher = require('../../dispatcher/dispatcher'),
    NoteConstants = require('../../constants/note_constants'),
    _notes = {},
    NoteStore = new Store(AppDispatcher);

var resetNotes = function(notes) {
    _notes = {};
    notes.forEach(function (note) {
        _notes[note.id] = note;
    });
};

var resetNote = function(note) {
    _notes[note.id] = note;
};

var deleteNote = function(noteId) {
    delete _notes[noteId];
};

NoteStore.__onDispatch = function (payload) {
    switch(payload.actionType) {
        case NoteConstants.RECEIVE_ALL_NOTES:
            resetNotes(payload.notes);
            NoteStore.__emitChange();
            break;
        case NoteConstants.RECEIVE_SINGLE_NOTE:
            resetNote(payload.note);
            NoteStore.__emitChange();
            break;
        case NoteConstants.REMOVE_NOTE:
            deleteNote(payload.note);
            NoteStore.__emitChange();
            break;
    }
};

NoteStore.all = function() {
    var notes = Object.assign({}, _notes);
    return notes;
};

NoteStore.find = function(noteId) {
    return _notes[noteId];
};



module.exports = NoteStore;
