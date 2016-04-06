var React = require('react'),
    NavBar = require('./navbar/navbar'),
    NotesIndex = require('./notes/notes_index'),
    NotebookApi = require('../utils/notebooks_util'),
    NoteApi = require('../utils/notes_util');


 var App = React.createClass({
   getInitialState: function () {
      return { header: this.filterNotes() };
   },

   filterNotes: function() {
      if (this.props.params.notebookId) {
         var activeNotebookId = parseInt(this.props.params.notebookId);
         NotebookApi.receiveCurrentNotebook(activeNotebookId);
         return {display: "notebook", id: activeNotebookId};
      } else {
         NoteApi.fetchAllNotes();
         return {display: "notes"};
      }
   },

   render: function () {
     return (
       <div className='container-left group'>
         <NavBar params={this.props.params} />
         <NotesIndex filter={this.state.header} />
         <div className='container-right group'>
            {this.props.children}
         </div>
       </div>
     );
   }
});


module.exports = App;
