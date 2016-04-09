var React = require('react'),
    Link = require('react-router').Link,
    LoginForm = require('./login_form');

var SignUpHeader = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleClick: function() {
    this.context.router.push('/login');
  },
  render: function() {

    return (
      <header className='sign-up-header group'>
        <Link to='/' className='sign-up-header-logo'>
          <div className='sign-up-header-brand'></div>
          <h1 className='sign-up-header-title'>FoxNote</h1>
        </Link>
        <button className='sign-in-header-link'
                onClick={this.handleClick}>Sign In</button>
      </header>
    );
  }
});

module.exports = SignUpHeader;
