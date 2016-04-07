var React = require('react'),
    SearchStore = require('../../stores/search'),
    SearchApi = require('../../utils/search_util');

var Search = React.createClass({
  getInitialState: function() {
    return {query: ""};
  },

  componentDidMount: function() {
    this.searchListener = SearchStore.addListener(this._onChange);
  },
  componentWillUnmount: function() {
    this.searchListener.remove();
  },
  _onChange: function() {
    this.setState({results: SearchStore.all()});
  },

  handleInputChange: function(e) {
    var query = e.currentTarget.value;
    this.setState({query: query}, function () {
      if (query.length > 0) {
        this.search();
      }
    }.bind(this));
  },

  search: function() {
    SearchApi.search(this.state.query, 1);
  },

  nextPage: function () {
    var meta = SearchStore.meta();
    SearchApi.search(meta.query, meta.page + 1);
  },

  results: function() {
    return SearchStore.all().map(function (result) {
      if (result._type === 'Note') {
        return (
          <li key={ result.id }>
            Note: { result.title }
          </li>
        );
      } else {
        return (
          <li key={ result.id }>
            Notebook: { result.title }
          </li>
        );
      }
    });
  },

  render: function() {
    var meta = SearchStore.meta();
    return (
      <article>
        <input type='text' onChange={this.handleInputChange} />
        <nav>
          Displaying page { meta.page } of { meta.total_pages }
          <button onClick={ this.nextPage }>Next Page</button>
        </nav>

        <ul>
          { this.results() }
        </ul>
      </article>
    );
  }
});

module.exports = Search;
