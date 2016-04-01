var React = require('react'),
    Link = require('react-router').Link,
    SessionStore = require('../../stores/session'),
    AccountBadge = require('./account_badge');

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <div className='navbar-container group'>
        <div className='navbar-main'>
          <ul>
            <li className='small-logo'>
            </li>
            <li className='navbar-link'>
              <Link to="/home/newNote">Add Note</Link>
            </li>
            <li className='navbar-link'>
              <Link to="/home/search">Search Note</Link>
            </li>
            <li className='navbar-link nav-icon'>
              <Link to="/home">All Note</Link>
            </li>
            <li className='navbar-link nav-icon'>
              <Link to="/home">All Notebooks</Link>
            </li>
          </ul>
          <AccountBadge user={SessionStore.currentUser()} />
        </div>
      </div>
  );
  }
});

module.exports = NavBar;
