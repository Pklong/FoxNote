var React = require('react'),
    NavBar = require('./navbar/navbar'),
    NotesIndex = require('./notes/notes_index'),
    NotebookApi = require('../utils/notebooks_util'),
    Notification = require('./notification'),
    NotesApi = require('../utils/notes_util');


 var App = React.createClass({

    componentWillMount: function() {
      NotesApi.fetchAllNotes();
      NotebookApi.fetchAllNotebooks();
   },

   render: function () {
     return (
       <div className='container-left group'>
         <NavBar params={this.props.params} />
         <NotesIndex params={this.props.params} />
         <div className='container-right group'>
            <Notification />
            {this.props.children}
         </div>
       </div>
     );
   }
});


module.exports = App;
