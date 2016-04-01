var React = require('react'),
    LoginForm = require('./login_form');

var SignUpHeader = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleClick: function() {
    this.context.router.push('/Login');
  },
  render: function() {

    return (
      <header className='sign-up-header group'>
        <div className='sign-up-header-brand'></div>
        <button className='sign-in-header-link'
                onClick={this.handleClick}>Sign In</button>
      </header>
    );
  }
});

module.exports = SignUpHeader;
