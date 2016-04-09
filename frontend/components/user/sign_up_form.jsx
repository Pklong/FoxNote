var React = require('react'),
    SessionAPI = require('../../utils/session_util'),
    ValidationUtil = require('../../utils/validation_util');

var SignUpForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: ""
    };
  },

  _guestLogin: function(e) {
    e.preventDefault();

    SessionAPI.guestLogin(function() {
      this.context.router.push("/home");
    }.bind(this));
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var router = this.context.router;

    SessionAPI.createUser(this.state, function() {
      router.push("/home");
    }, function() {
      this.setState({emailError: "This email has already been registered."});
    }.bind(this)
  );
  },

  updateEmail: function(e) {
    this.setState({ email: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  },

  showEmailError: function() {
    if (ValidationUtil.isValidEmail(this.state.email)) {
      this.setState({emailError: ""});
      return;
    }

    if (this.state.email.length < 1) {
      this.setState({emailError: "This field is required."});
    } else {
      this.setState({emailError: "A valid email address is required."});
    }
  },

  showPasswordError: function() {
    if (ValidationUtil.isValidLength(this.state.password, 6)) {
      this.setState({passwordError: ""});
      return;
    }

    if (this.state.password.length < 1) {
      this.setState(
        {passwordError: "This field is required."}
      );
    } else {
      this.setState(
        {passwordError: "Password needs to contain at least 6 characters."}
      );
    }
  },

  clearEmailError: function() {
    this.setState({emailError: ""});
  },

  clearPasswordError: function() {
    this.setState({passwordError: ""});
  },

  buildEmailError: function() {
    if (this.state.emailError.length > 0) {
      return (
        <span className='user-form-error-message'>
          {this.state.emailError}
        </span>
      );
    } else {
      return null;
    }
  },

  buildPasswordError: function() {
    if (this.state.passwordError.length > 0) {
      return (
        <span className='user-form-error-message'>
          {this.state.passwordError}
        </span>
      );
    } else {
      return null;
    }
  },

  validEmailAndPassword: function() {
    var validEmail = ValidationUtil.isValidEmail(this.state.email);
    var validPassword = ValidationUtil.isValidLength(this.state.password, 6);

    return (validEmail && validPassword);
  },

  render: function() {
    var emailError,
        passwordError,
        submissionDisabled;

    emailError = this.buildEmailError();
    passwordError = this.buildPasswordError();

    submissionDisabled = (!this.validEmailAndPassword()) ? true : false;

    return (
      <div className='user-form-container'>
        <h1 className='sign-up-title'>Remember Everything</h1>
        <h3 className='sign-up-subtitle'>
        Modern life can be complicated. Simplify it with FoxNote,
        the app to manage it all.</h3>

        <form onSubmit={this.handleSubmit} className='user-form'>

          <label htmlFor="email" className='sign-up-label'>
            <input className='user-form-input'
              onChange={this.updateEmail}
              type="text"
              placeholder='Email'
              onBlur={this.showEmailError}
              onFocus={this.clearEmailError}
              value={this.state.email}/>

            {emailError}
          </label>

          <label htmlFor="password" className='sign-up-label'>
            <input className='user-form-input'
              onChange={this.updatePassword}
              type="password"
              onBlur={this.showPasswordError}
              onFocus={this.clearPasswordError}
              placeholder='Password'
              value={this.state.password}/>

            {passwordError}
          </label>

          <button className='user-form-submit' disabled={submissionDisabled}>
                  Sign up for free
          </button>

          <button className='user-form-submit' onClick={this._guestLogin}>
            Explore as Guest
          </button>

        </form>
      </div>
    );
  }
});

module.exports = SignUpForm;
