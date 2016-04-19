var React = require('react'),
    NotificationStore = require('../stores/notification');

var Notification = React.createClass({
  getInitialState: function() {
    return ({notification: ""});
  },

  componentWillMount: function() {
    this.msgListener = NotificationStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.msgListener.remove();
  },

  _onChange: function() {
    this.setState({notification: NotificationStore.getMessage()});
  },

  _clearMsg: function() {
    this.setState({notification: ""});
  },

  _buildMsg: function() {
    if (this.state.notification.length > 0) {
      return (
          <p className='notification'>{this.state.notification}</p>
      );
    } else {
      return null;
    }
  },

  render: function() {
    var msg = this._buildMsg();
    if (this.state.notification.length > 0) {
      window.setTimeout(function() {
        this._clearMsg();
      }.bind(this), 2000);
    }

    return (<span>{msg}</span>);
  },
});

module.exports = Notification;
