var React = require('react'),
    Link = require('react-router').Link,

    Modal = require('react-modal'),
    ModalStyleDrawer = require('./modal_style_drawer'),
    ModalStyleForm = require('./modal_style_form'),
    ALLNOTEBOOK = 'ALL_NOTEBOOK',
    SEARCHNOTES = 'SEARCH_NOTES',

    Search = require('../search/search'),
    NotebookApi = require('../../utils/notebooks_util'),
    NotebookActions = require('../../actions/notebook_actions'),
    NotebookIndex = require('../notebooks/notebook_index'),
    NotebookStore = require('../../stores/notebook'),
    NotebookForm = require('../notebooks/notebook_form'),
    NoteForm = require('../notes/note_form'),
    SessionStore = require('../../stores/session'),
    NotesApi = require('../../utils/notes_util'),
    NoteActions = require('../../actions/note_actions'),
    AccountBadge = require('./account_badge');

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return ({showModal: null, notebooks: NotebookStore.all()});
  },

  _handleNotebookIndexClick: function() {
    this.setState({showModal: ALLNOTEBOOK});
  },

  _handleAddNoteClick: function() {
    var newNote = this._buildDummyNote();

    NotesApi.createNote(newNote, function(noteId) {
      this._closeModal();
      this.context.router.push("/home/notes/" + noteId);
    }.bind(this));
  },

  _handleSearchClick: function() {
    this.setState({showModal: SEARCHNOTES});
  },

  _closeModal: function() {
    this.setState({showModal: null});
  },

  _clearCurrentNotebook: function() {
    this._closeModal();
    NotebookActions.receiveCurrentNotebook(null);
    this.context.router.push("/home");
  },
  _handleLogoClick: function() {
    this._closeModal();
    this.context.router.push("/home");
  },

  _buildDummyNote: function() {
    var newNotebookId;

    if (NotebookStore.currentNotebook().id) {
      newNotebookId = NotebookStore.currentNotebook().id;
    } else {
      newNotebookId = NotebookStore.all()[0].id;
    }

    return {
      title: "Title your note",
      body: "just start typing...",
      body_delta: '{"ops":[{"insert":"just start typing..."}]}',
      notebook_id: newNotebookId
    };
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

        case SEARCHNOTES:
          component = <Search closeModal={this._closeModal} />;
          style = ModalStyleForm;
          break;
      }

      modal = (
        <Modal className='modal-drawer'
          isOpen={Boolean(this.state.showModal)}
          onRequestClose={this._closeModal}
          closeTimeoutMS={250}
          style={style}>
          {component}
        </Modal>
      );
    }

    return (
      <div className='navbar-container group'>
        <div className='navbar-main'>
          <ul>
            <li className='small-logo'
                onClick={this._handleLogoClick}>
            </li>
            <li className='navbar-link'>
              <div
                className='icon-navbar-add-note'
                onClick={this._handleAddNoteClick} >
                <div className='navbar-arrow-left'></div>
                <span className='navbar-text-add-note'>
                  New Note
                </span>
              </div>
            </li>
            <li className='navbar-link'>
              <div
                className='icon-navbar-search-notes'
                onClick={this._handleSearchClick} >
                <div className='navbar-arrow-left'></div>
                <span className='navbar-text-search'>
                  Search
                </span>
              </div>
            </li>
            <li className='navbar-link nav-icon'>
              <div
                className='icon-navbar-all-notes'
                onClick={this._clearCurrentNotebook}>
                <div className='navbar-arrow-left'></div>
                <span className='navbar-text-notes'>
                  Notes
                </span>
              </div>
            </li>
            <li className='navbar-link nav-icon'>
              <div
                className='icon-navbar-all-notebooks'
                onClick={this._handleNotebookIndexClick}>
                <div className='navbar-arrow-left'></div>
                <span className='navbar-text-notebook'>
                  Notebooks
                </span>
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
