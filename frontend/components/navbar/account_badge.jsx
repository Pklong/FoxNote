var React = require('react'),
    SessionAPI = require('../../utils/session_util');

var AccountBadge = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },


  getInitialState: function() {
    return {
      email: this.props.user.email,
      image: this.props.user.image
    };
  },

  handleEmailChange: function(e) {
    this.setState({ email: e.currentTarget.value });
  },

  handleFileChange: function(e) {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      var result = reader.result;
      this.setState({ imageFile: file, image: result });
    }.bind(this);

    reader.readAsDataURL(file);
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("user[email]", this.state.email);
    if (this.state.imageFile) {
      formData.append("user[image]", this.state.imageFile);
    }
    SessionAPI.editUser(formData, this.props.user.id, function() {
      this.props.closeModal();
    }.bind(this));

  },

  handleClick: function(e) {
    e.preventDefault();
    SessionAPI.logout();
    this.context.router.push("/");
  },

  render: function () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <label>Email
            <input
              type='text'
              placeholder='Enter your e-mail'
              onChange={this.handleEmailChange}
              value={this.state.email}
              />
          </label>
          <br />
          <label>User Avatar
            <input
              type='file'
              onChange={this.handleFileChange}
              />
          </label>
          <br />
          <input type="submit" value="Edit Account"/>
        </form>
        <p>Current Avatar:</p>
        <img src={this.state.image} />
        <button onClick={this.handleClick}>Log Out</button>
      </div>
    );
  }
});

module.exports = AccountBadge;
