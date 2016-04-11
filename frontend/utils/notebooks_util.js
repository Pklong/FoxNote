var NotebookActions = require('../actions/notebook_actions');

var NotebooksAPI = {
  fetchAllNotebooks: function() {
    $.ajax({
      type: 'GET',
      url: '/api/notebooks',
      dataType: 'json',
      success: function (notebooks) {
        NotebookActions.receiveAllNotebooks(notebooks);
      },
      error: function () {
        console.error("Failed fetchAllNotebooks...");
      }
    });
  },
  fetchCurrentNotebook: function(notebookId) {
    $.ajax({
      type: 'GET',
      url: '/api/notebooks/' + notebookId,
      dataType: 'json',
      success: function (notebook) {
        NotebookActions.receiveCurrentNotebook(notebook);
      },
      error: function () {
        console.error("Failed fetchCurrentNotebook...");
      }
    });
  },
  createNotebook: function(notebook, completionCallback) {
    $.ajax({
      type:'POST',
      url: '/api/notebooks',
      dataType: 'json',
      data: {notebook: notebook},
      success: function (newNotebook) {
        NotebookActions.createNotebook(newNotebook);
        if (completionCallback) {completionCallback();}
      },
      error: function () {
        console.error("Failed createNotebook...");
      }
    });
  },
  updateNotebook: function(notebook, completionCallback) {
    $.ajax({
      type: 'PATCH',
      url: '/api/notebooks/' + notebook.id,
      dataType: 'json',
      success: function(updatedNotebook) {
        NotebookActions.updateNotebook(updatedNotebook);
        if (completionCallback) {completionCallback();}
      },
      error: function () {
        console.error("Failed updateNotebook...");
      }
    });
  },
  removeNotebook: function(notebookId) {
    $.ajax({
      type: 'DELETE',
      url: '/api/notebooks/' + notebookId,
      dataType: 'json',
      success: function (notebook) {
        NotebookActions.removeNotebook(notebook);
      },
      error: function () {
        console.error("Failed removeNotebook...");
      }
    });
  }
};

module.exports = NotebooksAPI;
