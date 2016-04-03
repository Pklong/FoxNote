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
  fetchSingleNotebook: function(notebookId) {
    $.ajax({
      type: 'GET',
      url: '/api/notebooks/' + notebookId,
      dataType: 'json',
      success: function (notebook) {
        NotebookActions.receiveSingleNotebook(notebook);
      },
      error: function () {
        console.error("Failed fetchSingleNotebook...");
      }
    });
  },
  createNotebook: function(notebook, cb) {
    $.ajax({
      type:'POST',
      url: '/api/notebooks',
      dataType: 'json',
      data: {notebook: notebook},
      success: function (newNotebook) {
        NotebookActions.createNotebook(newNotebook);
        cb && cb(newNotebook.id);
      },
      error: function () {
        console.error("Failed createNotebook...");
      }
    });
  },
  updateNotebook: function(notebook, cb) {
    $.ajax({
      type: 'PATCH',
      url: '/api/notebooks/' + notebook.id,
      dataType: 'json',
      success: function(updatedNotebook) {
        NotebookActions.updateNotebook(updatedNotebook);
        cb && cb(updatedNotebook.id);
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
      success: function () {
        NotebookActions.removeNotebook(notebookId);
      },
      error: function () {
        console.error("Failed removeNotebook...");
      }
    });
  }
};

module.exports = NotebooksAPI;
