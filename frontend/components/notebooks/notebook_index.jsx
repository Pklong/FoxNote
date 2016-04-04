var React = require('react'),
    NotebooksApi = require('../../utils/notebooks_util'),
    NotebookStore = require('../../stores/notebook'),
    NotebookIndexItem = require('./notebook_index_item'),
    NotebookViewHeader = require('./notebook_view_header');

var NotebookIndex = React.createClass({
  getInitialState: function() {
    return {notebooks: NotebookStore.all()};
  },
  componentDidMount: function() {
    this.notebookListener = NotebookStore.addListener(this._notebookChange);
    NotebooksApi.fetchAllNotebooks();
  },
  componentWillUnmount: function() {
    this.notebookListener.remove();
  },
  _notebookChange: function() {
    this.setState({
      notebooks: NotebookStore.all()
    });
  },
  render: function() {
    var notebooks = this.state.notebooks.map(function(notebook, i) {
      return <NotebookIndexItem closeModal={this.props.closeModal}
                                key={notebook.id}
                                notebook={notebook} />;
                            }.bind(this));
    return (
      <div className='notebook-view'>
        <NotebookViewHeader />
        <ul>
          {notebooks}
        </ul>
      </div>
    );
  }
});

module.exports = NotebookIndex;
