var AppDispatcher = require('../dispatcher/dispatcher'),
    SearchResultConstants = require('../constants/search_result_constants');

module.exports = {
  receiveResults: function (response) {
    var action = {
      actionType: SearchResultConstants.SEARCH_RESULTS_RECEIVED,
      searchResults: response.search_results,
      meta: response.meta
    };
    AppDispatcher.dispatch(action);
  }
};
