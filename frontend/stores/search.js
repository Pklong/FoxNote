var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher'),
    SearchResultConstants = require('../constants/search_result_constants'),
    SearchResultsStore = new Store(AppDispatcher),
    _searchResults = [],
    _meta = {};

SearchResultsStore.all = function () {
  return _searchResults.slice();
};

SearchResultsStore.meta = function () {
  return $.extend(true, {}, _meta);
};

SearchResultsStore.clear = function () {
  _searchResults = [];
};

SearchResultsStore.__onDispatch = function (payload) {

  switch (payload.actionType) {
    case SearchResultConstants.SEARCH_RESULTS_RECEIVED:
      _searchResults = payload.searchResults;
      _meta = payload.meta;
      SearchResultsStore.__emitChange();
      break;
  }
};

module.exports = SearchResultsStore;
