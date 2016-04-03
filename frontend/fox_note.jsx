var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Modal = require('react-modal'),

    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    // IndexRoute = ReactRouter.IndexRoute,
    browserHistory = ReactRouter.browserHistory,

    Welcome = require('./components/welcome'),
    LoginForm = require('./components/user/login_form'),
    App = require('./components/app'),
    NoteView = require('./components/notes/note_view'),
    Search = require('./components/search/search'),

    SessionStore = require('./stores/session'),
    SessionAPI = require('./utils/session_util');


var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Welcome} />
        <Route path="login" component={LoginForm} />
        <Route path="home" component={App} onEnter={_requireLoggedIn} >
            <Route path="notebooks/:notebookId">
                <Route path="notes/:noteId" component={NoteView} />
            </Route>
            <Route path="notes/:noteId" component={NoteView} />
            <Route path="search" component={Search} />
        </Route>
    </Router>
);

function _requireLoggedIn(nextState, replace, completionCallback) {
    if (!SessionStore.currentUserHasBeenFetched()) {
        SessionAPI.fetchCurrentUser(_redirectIfNotLoggedIn);
    } else {
        _redirectIfNotLoggedIn();
    }

    function _redirectIfNotLoggedIn() {
        if (!SessionStore.isLoggedIn()) {
            replace("/");
        }

        completionCallback();
    }
}



window.initializeApp = function() {
    Modal.setAppElement(document.body);
    ReactDOM.render(
        routes,
        document.getElementById("root")
    );
};
