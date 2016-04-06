var React = require('react'),
    NavBar = require('./navbar/navbar'),
    NotesIndex = require('./notes/notes_index'),
    NotebookApi = require('../utils/notebooks_util'),
    NoteApi = require('../utils/notes_util');


 var App = React.createClass({
   getInitialState: function () {
      return { noteHeader: this.filterNotes() };
   },

   filterNotes: function() {
      if (this.props.params.notebookId) {
         var activeNotebookId = parseInt(this.props.params.notebookId);
         NotebookApi.fetchCurrentNotebook(activeNotebookId);
         return {display: "notebooks", id: activeNotebookId};
      } else {
         NoteApi.fetchAllNotes();
         return {display: "notes"};
      }
   },

   render: function () {
     return (
       <div className='container-left group'>
         <NavBar params={this.props.params} />
         <NotesIndex filter={this.state.noteHeader} />
         <div className='container-right group'>
            {this.props.children}
         </div>
       </div>
     );
   }
});


module.exports = App;
