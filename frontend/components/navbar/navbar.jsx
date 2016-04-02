var React = require('react'),
    Link = require('react-router').Link,
    
    Modal = require('react-modal'),
    ModalStyleDrawer = require('./modal_style_drawer'),
    ModalStyleForm = require('./modal_style_form'),
    ALLNOTEBOOK = 'ALL_NOTEBOOK',
    NEWNOTEBOOK = 'NEW_NOTEBOOK',
    NEWNOTE = 'NEW_NOTE',

    NotebookIndex = require('../notebooks/notebook_index'),
    NotebookForm = require('../notebooks/notebook_form'),
    NoteForm = require('../notes/note_form'),
    SessionStore = require('../../stores/session'),
    AccountBadge = require('./account_badge');

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return ({showModal: null});
  },

  _handleNotebookIndexClick: function() {
    console.log("noteindex");
    this.setState({showModal: ALLNOTEBOOK});
  },

  _handleNewNotebookClick: function() {
    console.log("newnotebookindex");
    this.setState({showModal: NEWNOTEBOOK});
  },

  _handleAddNoteClick: function() {
    console.log("Add note click");
    this.setState({showModal: NEWNOTE});
  },

  _closeModal: function() {
    this.setState({showModal: null});
  },

  render: function() {
    var modal,
        component,
        style;

    if (this.state.showModal) {
      switch (this.state.showModal) {
        case ALLNOTEBOOK:
          component = <NotebookIndex closeModal={this._closeModal} />;
          style = ModalStyleDrawer;
          break;

        case NEWNOTEBOOK:
          component = <NotebookForm closeModal={this._closeModal} />;
          break;

        case NEWNOTE:
          component = <NoteForm closeModal={this._closeModal} />;
          style = ModalStyleForm;
          break;
      }

      modal = (
        <Modal
          isOpen={Boolean(this.state.showModal)}
          onRequestClose={this._closeModal}
          style={style}>
          {component}
        </Modal>
      );
    }
    // isOpen={bool}
    // onRequestClose={fn}
    // closeTimeoutMS={n}
    // style={customStyle}>

    return (
      <div className='navbar-container group'>
        <div className='navbar-main'>
          <ul>
            <li className='small-logo'>
            </li>
            <li className='navbar-link'>
              <div onClick={this._handleAddNoteClick}>
                Add Note
              </div>
            </li>
            <li className='navbar-link'>
              <div>Search Note</div>
            </li>
            <li className='navbar-link nav-icon'>
              <div>All Note</div>
            </li>
            <li className='navbar-link nav-icon'>
              <div onClick={this._handleNotebookIndexClick}>
                All Notebooks
              </div>
            </li>
          </ul>
          <AccountBadge user={SessionStore.currentUser()} />
        </div>
        {modal}
      </div>
  );
  }
});

module.exports = NavBar;
