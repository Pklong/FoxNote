var React = require('react'),
    Link = require('react-router').Link,

    Modal = require('react-modal'),
    ModalStyleDrawer = require('./modal_style_drawer'),
    ModalStyleForm = require('./modal_style_form'),
    ALLNOTEBOOK = 'ALL_NOTEBOOK',
    NEWNOTE = 'NEW_NOTE',

    NotebookActions = require('../../actions/notebook_actions'),
    NotebookIndex = require('../notebooks/notebook_index'),
    NotebookForm = require('../notebooks/notebook_form'),
    NoteForm = require('../notes/note_form'),
    SessionStore = require('../../stores/session'),
    NotesApi = require('../../utils/notes_util'),
    NavbarLinkIcon = require('./navbar_link_icon'),
    AccountBadge = require('./account_badge');

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return ({showModal: null});
  },

  _handleNotebookIndexClick: function() {
    this.setState({showModal: ALLNOTEBOOK});
  },

  _handleAddNoteClick: function() {
    this.setState({showModal: NEWNOTE});
  },

  _closeModal: function() {
    this.setState({showModal: null});
  },

  _clearCurrentNotebook: function() {
    this.context.router.push("/home");
    NotebookActions.receiveCurrentNotebook(null);
  },

  render: function() {
    var modal,
        component,
        style;

    if (this.state.showModal) {
      switch (this.state.showModal) {
        case ALLNOTEBOOK:
          component = <NotebookIndex  params={this.props.params}
                                      closeInitialModal={this._closeModal} />;
          style = ModalStyleDrawer;
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

    return (
      <div className='navbar-container group'>
        <div className='navbar-main'>
          <ul>
            <li className='small-logo'>
            </li>
            <li className='navbar-link'>
              <div
                className='icon-navbar-add-note'
                onClick={this._handleAddNoteClick} ></div>
            </li>
            <li className='navbar-link'>
              <div
                className='icon-navbar-search-notes'></div>
            </li>
            <li className='navbar-link nav-icon'>
              <div
                className='icon-navbar-all-notes'
                onClick={this._clearCurrentNotebook}></div>
            </li>
            <li className='navbar-link nav-icon'>
              <div
                className='icon-navbar-all-notebooks'
                onClick={this._handleNotebookIndexClick}></div>
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
