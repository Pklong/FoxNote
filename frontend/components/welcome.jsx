var React = require('react'),
    SignUpHeader = require('./user/sign_up_header'),
    SignUpForm = require('./user/sign_up_form');

var Welcome = React.createClass({
  render: function() {
    return (
      <div className='welcome'>
        <SignUpHeader />
        <SignUpForm />
      </div>
    );
  }
});

module.exports = Welcome;
