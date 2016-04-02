var AppDispatcher = require('../dispatcher/dispatcher'),
    NotebookConstants = require('../constants/notebook_constants');

var NotebookActions = {
    receiveAllNotes: function(notebooks) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.RECEIVE_ALL_NOTEBOOKS,
            notebooks: notebooks
        });
    },
    receiveSingleNote: function(notebook) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.RECEIVE_SINGLE_NOTEBOOK,
            notebook: notebook
        });
    },
    removeNote: function(notebook) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.REMOVE_NOTEBOOK,
            notebook: notebook
        });
    },
    createNote: function(notebook) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.CREATE_NOTEBOOK,
            notebook: notebook
        });
    },
    updateNote: function(notebook) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.UPDATE_NOTEBOOK,
            notebook: notebook
        });
    }
};

module.exports = NotebookActions;
