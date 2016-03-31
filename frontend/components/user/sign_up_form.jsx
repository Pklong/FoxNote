var React = require('react');
var SessionUtil = require('../utils/session_util');

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
      <div>
        <h1>Please Log in</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input className='user-form-input'
                 onChange={this.updateEmail}
                 type="text"
                 value={this.state.email}/>

          <label htmlFor="password">Password</label>
          <input className='user-form-input'
                 onChange={this.updatePassword}
                 type="password"
                 value={this.state.password}/>

               <button className='user-form-submit'>Submit</button>
        </form>
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

module.exports = SignUpForm;
