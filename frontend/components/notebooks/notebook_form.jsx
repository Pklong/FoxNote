var React = require('react'),
    NotebookApi = require('../../utils/notebooks_util'),
    NoteActions = require('../../actions/note_actions'),
    NotebookStore = require('../../stores/notebook'),
    NotebookActions = require('../../actions/notebook_actions');

var NotebookForm = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return ({title: ""});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        NotebookApi.createNotebook(this.state, function () {
            this.context.router.push("/home");
            this.props.closeModal();
        }.bind(this));
    },
    handleCancel: function (e) {
        e.preventDefault();
        this.props.closeModal();
    },
    handleTitleChange: function(e) {
        this.setState({title:e.target.value});
    },
    render: function () {
        var btnDisabled = (this.state.title.length < 1) ? true : false;

        return (
            <div className='notebook-form-container'>
                <div className='notebook-form-icon'></div>
                <h3 className='notebook-form-header'>Create Notebook</h3>
                <hr className='notebook-form-divider' />
                <form className='notebook-form'>
                    <input
                        htmlFor="title"
                        className='notebook-form-title'
                        type='text'
                        placeholder='Title your notebook'
                        onChange={this.handleTitleChange} />
                      <div className="notebook-form-buttons">
                        <button
                          className='notebook-form-cancel'
                          onClick={this.handleCancel}>Cancel</button>
                        <button
                          disabled={btnDisabled}
                          className='notebook-form-submit'
                          onClick={this.handleSubmit}>Create notebook</button>
                      </div>
                </form>
            </div>
        );
    },

});

module.exports = NotebookForm;
