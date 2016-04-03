var NoteActions = require('../actions/note_actions');

var NotesAPI = {
  fetchAllNotes: function() {
    $.ajax({
      type: 'GET',
      url: '/api/notes',
      dataType: 'json',
      success: function (notes) {
        NoteActions.receiveAllNotes(notes);
      },
      error: function () {
        console.error("Failed fetchAllNotes...");
      }
    });
  },
  fetchSingleNote: function(noteId) {
    $.ajax({
      type: 'GET',
      url: '/api/notes/' + noteId,
      dataType: 'json',
      success: function (note) {
        NoteActions.receiveSingleNote(note);
      },
      error: function () {
        console.error("Failed fetchSingleNote...");
      }
    });
  },
  createNote: function(note, cb) {
    $.ajax({
      type: 'POST',
      url: '/api/notes',
      dataType: 'json',
      data: {note: note},
      success: function (newNote) {
        NoteActions.createNote(newNote);
        cb && cb(newNote.id);
      },
      error: function () {
        console.error("Failed createNote...");
      }
    });
  },
  updateNote: function(note, cb) {
    $.ajax({
      type: 'PATCH',
      url: '/api/notes/' + note.id,
      dataType: 'json',
      data: {note: note},
      success: function (updatedNote) {
        NoteActions.updateNote(updatedNote);
        cb && cb(updatedNote.id);
      },
      error: function () {
        console.error("Failed updateNote...");
      }
    });
  },
  removeNote: function(noteId) {
    $.ajax({
      type: 'DELETE',
      url: '/api/notes/' + noteId,
      dataType: 'json',
      success: function () {
        NoteActions.removeNote(noteId);
      },
      error: function () {
        console.error("Failed removeNote...");
      }
    });
  }
};

module.exports = NotesAPI;
