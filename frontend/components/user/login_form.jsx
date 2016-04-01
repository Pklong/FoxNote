var React = require('react'),
    Link = require('react-router').Link,
    SessionUtil = require('../../utils/session_util');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      email: "",
      password: ""
    };
  },

  render: function() {
    return (
      <div className='login-form-container'>
        <div className='login-brand'></div>
        <h1 className='login-form-title'>Sign in</h1>

        <form className='login-formset' onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input className='login-form-input'
                 onChange={this.updateEmail}
                 type="text"
                 value={this.state.email}/>

          <label htmlFor="password">Password</label>
          <input className='login-form-input'
                 onChange={this.updatePassword}
                 type="password"
                 value={this.state.password}/>

               <button className='login-form-submit'>Sign in</button>
        </form>
        <footer className='login-footer'>
          <p className='login-footer-subheader'>Don't have an account?</p>
          <Link className='login-footer-redirect'
                to="/">Create account</Link>
        </footer>
      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var router = this.context.router;

    SessionUtil.login(this.state, function() {
      router.push("/home");
    });
  },

  updateEmail: function(e) {
    this.setState({ email: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  }

});

module.exports = LoginForm;
