var NoteActions = require('../actions/note_actions');

var NotesUtil = {
  fetchAllNotes: function() {
    $.ajax({
      type: 'GET',
      url: 'api/notes',
      dataType: 'json',
      success: function (notes) {
        NoteActions.receiveAllNotes(notes);
      },
      error: function () {
        console.error("Failed AJAX request...");
      }
    });
  },
  fetchSingleNote: function(noteId) {
    $.ajax({
      type: 'GET',
      url: 'api/notes/' + noteId,
      dataType: 'json',
      success: function (note) {
        NoteActions.receiveSingleNote(note);
      },
      error: function () {
        console.error("Failed AJAX request...");
      }
    });
  },
  createNote: function(note, cb) {
    $.ajax({
      type: 'POST',
      url: 'api/notes',
      dataType: 'json',
      data: {note: note},
      success: function (newNote) {
        NoteActions.receiveSingleNote(newNote);
        cb && cb(newNote.id);
      },
      error: function () {
        console.error("Failed AJAX request...");
      }
    });
  },
  updateNote: function(note) {
    $.ajax({
      type: 'PATCH',
      url: 'api/notes/' + note.id,
      dataType: 'json',
      data: {note: note},
      success: function (newNote) {
        NoteActions.receiveSingleNote(newNote);
        cb && cb(newNote.id);
      },
      error: function () {
        console.error("Failed AJAX request...");
      }
    });
  },
  removeNote: function(noteId) {
    $.ajax({
      type: 'DELETE',
      url: 'api/notes/' + noteId,
      dataType: 'json',
      success: function () {
        NoteActions.removeNote(noteId);
      },
      error: function () {
        console.error("Failed AJAX request...");
      }
    });
  }
};

module.exports = NotesUtil;
