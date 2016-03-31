var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    hashHistory = require('react-router').hashHistory,
    NoteForm = require('./components/notes/note_form'),
    Welcome = require('./components/welcome'),
    Search = require('./components/search/search'),

    App = require('./components/app');

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome} />
        <Route path="home" component={App} onEnter>
            <Route path="notebook/:notebookId">
                <Route path="note/:noteId" component={NoteForm} />
            </Route>
            <Route path="note/:noteId" component={NoteForm} />
            <Route path="Search" component={Search} />
        </Route>
    </Router>
);


document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(
        routes,
        document.getElementById("root")
    );
});
