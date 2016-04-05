var React = require('react'),
    NavBar = require('./navbar/navbar'),
    NotesIndex = require('./notes/notes_index');


 var App = React.createClass({
    getInitialState: function () {
      return (
         {noteParams: this.noteRoute(this.props.params)}
      );
   },
   noteRoute: function(route) {
      if (this.props.params.notebookId) {
         return {
                  view: "notebooks",
                  notebookId: this.props.params.notebookId
               };
      } else {
         return { view: "notes" };
      }
   },
   render: function () {
     return (
       <div className='container-left group'>
         <NavBar />
         <NotesIndex view={this.noteParams} />
         <div className='container-right group'>
            {this.props.children}
         </div>
       </div>
     );
   }
});


module.exports = App;
