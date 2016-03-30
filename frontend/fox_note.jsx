var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    App = require('./components/app');



document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
});


NotesApiUtil = require('./utils/notes_api_util');
NoteStore = require('./stores/notes/note');
