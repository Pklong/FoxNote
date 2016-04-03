var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Modal = require('react-modal'),

    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    // IndexRoute = ReactRouter.IndexRoute,
    browserHistory = ReactRouter.browserHistory,

    LoginForm = require('./components/user/login_form'),
    NoteView = require('./components/notes/note_view'),
    Welcome = require('./components/welcome'),
    Search = require('./components/search/search'),

    SessionStore = require('./stores/session'),
    SessionUtil = require('./utils/session_util'),

    App = require('./components/app');

var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Welcome} />
        <Route path="home" component={App} onEnter={_requireLoggedIn} >
            <Route path="notebook/:notebookId">
                <Route path="note/:noteId" component={NoteView} />
            </Route>
            <Route path="note/:noteId" component={NoteView} />
            <Route path="search" component={Search} />
        </Route>
        <Route path="login" component={LoginForm} />
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
    Modal.setAppElement(document.body);
    ReactDOM.render(
        routes,
        document.getElementById("root")
    );
};
