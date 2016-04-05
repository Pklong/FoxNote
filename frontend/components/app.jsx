var React = require('react'),
    NotebookActions = require('../actions/notebook_actions'),
    NotebooksApi = require('../utils/notebooks_util'),
    NavBar = require('./navbar/navbar'),
    NotesIndex = require('./notes/notes_index');


 var App = React.createClass({
   render: function () {
     return (
       <div className='container-left group'>
         <NavBar params={this.props.params} />
         <NotesIndex />
         <div className='container-right group'>
            {this.props.children}
         </div>
       </div>
     );
   }
});


module.exports = App;
