var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),

    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,

    NoteForm = require('./components/notes/note_form'),
    Welcome = require('./components/welcome'),
    Search = require('./components/search/search'),

    SessionStore = require('./stores/session'),
    SessionUtil = require('./utils/session_util'),

    App = require('./components/app');

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome} />
        <Route path="home" component={App} onEnter={_requireLoggedIn} >
            <Route path="notebook/:notebookId">
                <Route path="note/:noteId" component={NoteForm} />
            </Route>
            <Route path="note/:noteId" component={NoteForm} />
            <Route path="search" component={Search} />
        </Route>
    </Router>
);

function _requireLoggedIn(nextState, replace, asyncCompletionCallback) {
    if (!SessionStore.currentUserHasBeenFetched()) {
        SessionUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
    } else {
        _redirectIfNotLoggedIn();
    }

    function _redirectIfNotLoggedIn() {
        if (!SessionStore.isLoggedIn()) {
            replace("/");
        }

        asyncCompletionCallback();
    }
}



window.initializeApp = function() {
    ReactDOM.render(
        routes,
        document.getElementById("root")
    );
};
