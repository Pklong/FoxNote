var React = require('react');
var SessionUtil = require('../../utils/session_util');

var SignUpForm = React.createClass({
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
      <div className='user-form-container'>
        <h1 className='sign-up-title'>Remember Everything</h1>
        <h3 className='sign-up-subtitle'
          >Modern life can be complicated. Simplify it with FoxNote,
        the app to manage it all.</h3>

        <form onSubmit={this.handleSubmit} className='user-form'>
          <label htmlFor="email"
                 className='sign-up-label'>
            <input className='user-form-input'
              onChange={this.updateEmail}
              type="text"
              placeholder='Email'
              value={this.state.email}/>
          </label>

          <label htmlFor="password"
                 className='sign-up-label'>
            <input className='user-form-input'
              onChange={this.updatePassword}
              type="password"
              placeholder='Password'
              value={this.state.password}/>
          </label>
          <button className='user-form-submit'>Sign up for free</button>
        </form>
      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var router = this.context.router;

    SessionUtil.createUser(this.state, function() {
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

module.exports = SignUpForm;
