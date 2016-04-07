var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Modal = require('react-modal'),

    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    browserHistory = ReactRouter.browserHistory,
    NoteForm = require('./components/notes/note_form'),
    Welcome = require('./components/welcome'),
    LoginForm = require('./components/user/login_form'),
    App = require('./components/app'),
    Search = require('./components/search/search'),
    NotebookActions = require('./actions/notebook_actions'),
    SessionStore = require('./stores/session'),
    SessionAPI = require('./utils/session_util');


var routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Welcome} />
        <Route path="login" component={LoginForm} />
        <Route path="home" component={App} onEnter={_requireLoggedIn} >
            <Route path="search" component={ Search } />
            <Route path='notes/:noteId' component={ NoteForm } />
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
        NotebookActions.receiveCurrentNotebook(null);
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
