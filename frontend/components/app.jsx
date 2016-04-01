var React = require('react'),
    NavBar = require('./navbar/navbar'),
    NotesIndex = require('./notes/notes_index');


 var App = React.createClass({
   render: function () {
     return (
       <div className='container-left group'>
         <NavBar />
         <NotesIndex />
         <div className='container-right group'>
            {this.props.children}
         </div>
       </div>
     );
   }
});


module.exports = App;
