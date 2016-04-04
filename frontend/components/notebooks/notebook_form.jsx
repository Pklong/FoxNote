var React = require('react'),
    NotebookApi = require('../../utils/notebooks_util');


var NotebookForm = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return ({title: ""});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var newNotebook = {
            title: this.state.title,
            author_id: this.props.authorId
        };
        NotebookApi.createNotebook(newNotebook, function () {

            this.props.closeModal();
            this.context.router.push("/home");
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
        return (
            <div>
                <h3 className='notebook-form-header'>Create Notebook</h3>
                <form className='notebook-form'>
                    <input
                        htmlFor="title"
                        className='notebook-form-title'
                        type='text'
                        placeholder='Title your notebook'
                        onChange={this.handleTitleChange} />
                    <button
                        className='notebook-form-cancel'
                        onClick={this.handleCancel}>Cancel</button>
                    <button
                        className='notebook-form-submit'
                        onClick={this.handleSubmit}>Create notebook</button>
                </form>
            </div>
        );
    },

});

module.exports = NotebookForm;
