var React = require('react'),
    NotificationStore = require('../stores/notification'),
    NotificationActions = require('../actions/notification_actions');

var Notification = React.createClass({
  getInitialState: function() {
    return ({notification: ""});
  },

  componentWillMount: function() {
    this.feedbackListener = NotificationStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.setState({notification: NotificationStore.getMessage()}, function() {
      if (this.state.notification.length > 0) {NotificationActions.clearMessage();}
    }.bind(this));

  },

  _buildMsg: function() {
    if (this.state.notification.length > 0) {
      return <p className='notification'>{this.state.notification}</p>;
    } else {
      return null;
    }
  },

  render: function() {
    var msg = this._buildMsg();

    return (
      <div>
        {msg}
      </div>
    );
  },
});

module.exports = Notification;
