var React = require('react'),
    SessionStore = require('../stores/session'),
    SessionUtil = require('../utils/session_util'),
    NavBar = require('./navbar/navbar'),
    NoteForm = require('./notes/note_form'),
    NotesIndex = require('./notes/notes_index');


 var App = React.createClass({
   contextTypes: {
     router: React.PropTypes.object.isRequired
   },
   getInitialState: function() {
     return {currentUser:null};
   },
   componentDidMount: function() {
     this.sessionStoreToken = SessionStore.addListener(this._onChange);
   },
   componentWillUnmount: function() {
     this.sessionStoreToken.remove();
   },
   _onChange: function() {
      if (SessionStore.isLoggedIn()) {
         debugger;
         this.setState({ currentUser: SessionStore.currentUser() });
      } else {
         this.context.router.push("/login");
      }
   },
   render: function () {
     return (
       <div className='container group'>
         <NavBar />
         <NotesIndex />
         <NoteForm />
         {this.props.children}
       </div>
     );
   }
});


module.exports = App;
