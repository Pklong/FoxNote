var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    browserHistory = require('react-router').browserHistory,
    App = require('./components/app');


var routes = (
    <Route path="/" component={App}>
    </Route>
);


document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(
        <Router history={browserHistory}>{routes}</Router>,
        document.getElementById("root")
    );
});
