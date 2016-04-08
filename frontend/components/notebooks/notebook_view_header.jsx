var React = require('react'),
    NEWNOTEBOOK = 'NEW_NOTEBOOK',
    Modal = require('react-modal'),
    ModalStyleForm = require('../navbar/modal_style_form'),
    NotebookForm = require('./notebook_form');

var NotebookViewHeader = React.createClass({
  getInitialState: function() {
    return ({showModal: null});
  },
  _handleNewNotebookClick: function() {
    this.setState({showModal: NEWNOTEBOOK});
  },
  _closeModal: function() {
    this.setState({showModal: null});
    this.props.closeFirstModal();
  },
  render: function() {
    var modal;
    if (this.state.showModal) {
      modal = (
        <Modal
          isOpen={Boolean(this.state.showModal)}
          onRequestClose={this._closeModal}
          style={ModalStyleForm}>
          <NotebookForm closeModal={this._closeModal} />;
        </Modal>
      );
    }

    // isOpen={bool}
    // onRequestClose={fn}
    // closeTimeoutMS={n}
    // style={customStyle}>
    //
    return (
      <div className='notebook-view-header-container'>
        <h2 className='notebook-view-title'>CREATE A NOTEBOOK</h2>
        <div className='notebook-view-add-notebook'
          onClick={this._handleNewNotebookClick}>NEW NOTEBOOK
        </div>
        {modal}
      </div>
    );
  }
});

module.exports = NotebookViewHeader;
