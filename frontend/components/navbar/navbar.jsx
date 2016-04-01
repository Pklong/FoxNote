var React = require('react'),
    AccountBadge = require('./account_badge');

var NavBar = React.createClass({
  render: function() {
    return (
      <div className='navbar-container group'>
        <div className='navbar-main'>
          <ul>
            <li className='small-logo'>
            </li>
            <li className='navbar-link'>
              <a href="#">Add Note</a>
            </li>
            <li className='navbar-link'>
              <a href="#">Search Notes</a>
            </li>
            <li className='navbar-link nav-icon'>
              <a href="#">All Notes</a>
            </li>
            <li className='navbar-link nav-icon'>
              <a href="#">All Notebooks</a>
            </li>
          </ul>
          <AccountBadge />
        </div>
      </div>
  );
  }
});

module.exports = NavBar;
