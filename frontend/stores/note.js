var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    NoteConstants = require('../constants/note_constants'),
    _notes = {},
    _currentNote = {id: null},
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

var deleteNote = function(note) {
    delete _notes[note.id];
};

var setCurrentNote = function(note) {
    if (note) {
        _currentNote = note;
    } else {
        _currentNote = {id: null};
    }
};

NoteStore.__onDispatch = function (payload) {
    switch(payload.actionType) {
        case NoteConstants.RECEIVE_ALL_NOTES:
            resetNotes(payload.notes);
            NoteStore.__emitChange();
            break;
        case NoteConstants.RECEIVE_CURRENT_NOTE:
            setCurrentNote(payload.note);
            NoteStore.__emitChange();
            break;
        case NoteConstants.CREATE_NOTE:
            resetNote(payload.note);
            setCurrentNote(payload.note);
            NoteStore.__emitChange();
            break;
        case NoteConstants.UPDATE_NOTE:
            resetNote(payload.note);
            setCurrentNote(payload.note);
            NoteStore.__emitChange();
            break;
        case NoteConstants.REMOVE_NOTE:
            deleteNote(payload.note);
            NoteStore.__emitChange();
            break;
    }
};

NoteStore.all = function() {
    var notes = [];
    for (var noteId in _notes) {
        if (_notes.hasOwnProperty(noteId)) {
            notes.push(_notes[noteId]);
        }
    }
    return notes;
};

NoteStore.currentNotebookNotes = function(notebookId) {
    var notes = [];
    for (var noteId in _notes) {
        if (_notes.hasOwnProperty(noteId)) {
            if (_notes[noteId].notebook_id === notebookId) {
                notes.push(_notes[noteId]);
            }
        }
    }
    return notes;
};

NoteStore.find = function(noteId) {
    return _notes[noteId];
};

NoteStore.currentNote = function() {
    return _currentNote;
};



module.exports = NoteStore;
