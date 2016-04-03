var SessionActions = require('../actions/session_actions');

var SessionAPI = {
  login: function(credentials, callback) {
    $.ajax({
      type: 'POST',
      url: '/api/session',
      dataType: 'json',
      data: credentials,
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
        callback && callback();
      },
      error: function() {
        console.error("Failed login...");
      },
    });
  },
  guestLogin: function(callback) {
    this.login({email: "student@aa.io", password: "sennacy"}, callback);
  },
  logout: function() {
    $.ajax({
      type: 'DELETE',
      url: '/api/session',
      dataType: 'json',
      success: function() {
        SessionActions.logout();
      },
      error: function() {
        console.error("Failed logout...");
      },
    });
  },
  fetchCurrentUser: function(completion) {
    $.ajax({
      type: 'GET',
      url: '/api/session',
      dataType: 'json',
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
      },
      error: function() {
        console.error("Failed fetchCurrentUser...");
      },
      complete: function () {
        completion && completion();
      }
    });
  },
  createUser: function(newUser, completion) {
    $.ajax({
      type: 'POST',
      url: '/api/users',
      dataType: 'json',
      data: {user: newUser},
      success: function(user) {
        SessionActions.currentUserReceived(newUser);
        completion && completion();
      },
      error: function() {
        console.error("Failed createUser...");
      }
    });
  }
};

module.exports = SessionAPI;
