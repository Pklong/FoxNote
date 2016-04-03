var AppDispatcher = require('../dispatcher/dispatcher'),
    NotebookConstants = require('../constants/notebook_constants');

var NotebookActions = {
    receiveAllNotebooks: function(notebooks) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.RECEIVE_ALL_NOTEBOOKS,
            notebooks: notebooks
        });
    },
    receiveSingleNotebook: function(notebook) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.RECEIVE_SINGLE_NOTEBOOK,
            notebook: notebook
        });
    },
    removeNotebook: function(notebook) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.REMOVE_NOTEBOOK,
            notebook: notebook
        });
    },
    createNotebook: function(notebook) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.CREATE_NOTEBOOK,
            notebook: notebook
        });
    },
    updateNotebook: function(notebook) {
        AppDispatcher.dispatch({
            actionType: NotebookConstants.UPDATE_NOTEBOOK,
            notebook: notebook
        });
    }
};

module.exports = NotebookActions;
