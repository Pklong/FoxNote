var AppDispatcher = require('../dispatcher/dispatcher'),
NotificationConstants = require('../constants/notification_constants');

module.exports = {
  clearMessage: function() {
    AppDispatcher.dispatch({
        actionType: NotificationConstants.CLEAR_NOTIFICATION_MESSAGE,
    });
  }
};
