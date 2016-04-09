var React = require('react'),
    Link = require('react-router').Link,
    SessionAPI = require('../../utils/session_util');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      email: "",
      password: "",
      errorMsg: ""
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var router = this.context.router;

    SessionAPI.login(
      this.state, function() {
        router.push("/home");
      },
      function() {
        this.setState({errorMsg: "Incorrect username and/or password."});
      }.bind(this)
    );
  },

  updateEmail: function(e) {
    this.setState({ email: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  },

  buildErrorMsg: function() {
    if (this.state.errorMsg) {
      return (
        <span className='login-form-error'>
          {this.state.errorMsg}
        </span>
      );
    } else {
      return null;
    }
  },

  render: function() {
    var errorMsg = this.buildErrorMsg();
    var passwordKlass = 'login-form-input';

    if (this.state.errorMsg.length > 0) {
      passwordKlass += ' login-form-error-focus';
    }

    return (
      <div className='login-form-container'>
        <div className='login-brand'></div>
        <h1 className='login-form-title'>Sign in</h1>

        <form className='login-formset' onSubmit={this.handleSubmit}>

          <label htmlFor="email">Email address
            <input className='login-form-input'
                   onChange={this.updateEmail}
                   type="text"
                   value={this.state.email}/>
          </label>

          <label htmlFor="password">Password
            <input className={passwordKlass}
                   onChange={this.updatePassword}
                   type="password"
                   value={this.state.password}/>
            {errorMsg}
          </label>

          <button className='login-form-submit'>Sign in</button>
        </form>

        <footer className='login-footer'>
          <p className='login-footer-subheader'>Don't have an account?</p>
          <Link className='login-footer-redirect' to="/">
            Create account
          </Link>
        </footer>
      </div>
    );
  }

});

module.exports = LoginForm;
