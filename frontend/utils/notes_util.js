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

  fetchCurrentNote: function(noteId) {
    $.ajax({
      type: 'GET',
      url: '/api/notes/' + noteId,
      dataType: 'json',
      success: function (note) {
        NoteActions.receiveCurrentNote(note);
      },
      error: function () {
        console.error("Failed fetchCurrentNote...");
      }
    });
  },

  createNote: function(note, completionCallback) {
    $.ajax({
      type: 'POST',
      url: '/api/notes',
      dataType: 'json',
      data: {note: note},
      success: function (newNote) {
        NoteActions.createNote(newNote);
        if (completionCallback) {completionCallback(newNote.id);}
      },
      error: function () {
        console.error("Failed createNote...");
      }
    });
  },

  updateNote: function(note, noteId, completionCallback) {
    $.ajax({
      type: 'PATCH',
      url: '/api/notes/' + noteId,
      dataType: 'json',
      data: {note: note},
      success: function (updatedNote) {
        NoteActions.updateNote(updatedNote);
        if (completionCallback) {completionCallback();}
      },
      error: function () {
        console.error("Failed updateNote...");
      }
    });
  },

  removeNote: function(noteId, completionCallback) {
    $.ajax({
      type: 'DELETE',
      url: '/api/notes/' + noteId,
      dataType: 'json',
      success: function (note) {
        NoteActions.removeNote(note);
        if (completionCallback) {completionCallback();}
      },
      error: function () {
        console.error("Failed removeNote...");
      }
    });
  }
};

module.exports = NotesAPI;
