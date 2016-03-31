var React = require('react'),
    LoginForm = require('./user/login_form');

var Welcome = React.createClass({
  render: function() {
    return (
      <LoginForm />
    );
  }
});

module.exports = Welcome;
