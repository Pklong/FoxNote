var AppDispatcher = require('../dispatcher/dispatcher'),
    SearchResultActions = require('../actions/search_actions');

module.exports = {
    search: function(query, page) {
        $.ajax({
            type: 'GET',
            url: '/api/searches',
            dataType: 'json',
            data: {query: query, page: page},
            success: function (response) {
                SearchResultActions.receiveResults(response);
            },
            error: function() {
                console.error("Failed AJAX Search...");
            }
        });
    }
};
