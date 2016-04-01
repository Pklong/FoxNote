var React = require('react'),
    SessionUtil = require('../../utils/session_util');

var AccountBadge = React.createClass({
  render: function () {
    return (
      <div className='navbar-account-box'
           onClick={SessionUtil.logout}>Account</div>
    );
  },
});

module.exports = AccountBadge;
