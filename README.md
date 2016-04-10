#FoxNote

FoxNote is a web application for writing and organizing notes. It was
inspired by Evernote and built using Ruby on Rails, React.js / Flux, and Quill.js

Write your thoughts at [FoxNote.tech](http://www.foxnote.tech/)

###Welcome View:

![welcome]

###Home View:

![NoteShow]

###Technical Details:
* FoxNote allows for rich-text editing using the Quill.js library. Formatting
is achieved with json objects called Deltas, which hold the format-type and result.
The plain-text contents of the editor are retrieved along with the formatting and stored
in separate columns of the database. When a note component is mounted, the editor applies
the formatting onto the plain-text. Here's a simple look at a Delta:

```
{
  ops:[
    { insert: 'Gandalf', attributes: { bold: true } },
    { insert: ' the ' },
    { insert: 'Grey', attributes: { color: '#ccc' } }
  ]
)
```

* FoxNote avoids using any text not created by the user, which made UX a primary
focus. I added visual feedback for user-initiated events such as hover, focus, and blur.
I also added a CSS transition delay that revealed text describing a button's function if
the user hovered for more than 2 seconds. These signals promote web accessibility
and the delay prevents regular users from seeing instructions they won't need.


###Features
* Sign up/in with email or Google
* Compose notes
* Rich-text formatting allows fonts, bold, italic, colors and more
* Organize notes within notebooks
* Search all note and notebook text from one page

###To-Do:
* [ ] Implement Responsive Web Design ( Flexbox )
* [ ] Tag Notes with multiple Tags
* [ ] Display Notes by Tag
* [ ] Pagination / infinite scroll for Notes Index
* [ ] Set Reminders on Notes
* [ ] Add Shortcuts to Notebooks and Notes
* [ ] Share Notes and Notebooks with other Users (View and/or Edit)
* [ ] Chat with other Users

[Original Design Docs](./docs/README.md)

[welcome]: ./docs/images/HomeView.png
[NoteShow]: ./docs/images/Welcome.png
