# FoxNote

[Live][heroku]

[heroku]: https://www.foxnote.tech

## Minimum Viable Product

FoxNote is a web application inspired by Evernote built using Ruby on Rails
and React.js. FoxNote allows users to:

- [X] Create an account
- [X] Log in / Log out
- [X] Create, read, edit, and delete Notes
- [X] Organize Notes within Notebooks
- [X] Create, edit, and delete Notebooks
- [X] Apply complex styling to Notes while editing
- [X] Search Notes for text


## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[wireframes]: ./views.md
[components]: ./components.md
[stores]: ./stores.md
[api-endpoints]: ./api-endpoints.md
[schema]: ./schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [X] create new project
- [X] create `User` model
- [X] authentication
- [X] user signup/signin pages
- [X] blank landing page after signin

### Phase 2: Notes Model, API, and basic APIUtil (1 day)

**Objective:** Notes can be created, read, edited and destroyed through
the API.

- [X] create `Note` model
- [X] seed the database with a small amount of test data
- [X] CRUD API for notes (`NotesController`)
- [X] jBuilder views for notes
- [X] setup Webpack & Flux scaffold
- [X] setup `APIUtil` to interact with the API
- [X] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1 day)

**Objective:** Notes can be created, read, edited and destroyed with the
user interface.

- [X] setup the flux loop with skeleton files
- [X] setup React Router
- implement each note component, building out the flux loop as needed.
  - [X] `NotesIndex` - Show All Notes
  - [X] `NoteIndexItem` - Abbreviated Note Show (title / updated_at)
  - [X] `NoteForm` - Create Note
  - [X] `NoteView` - Show Note
  - [X] `NoteEditArea` - Edit Note

### Phase 4: Start Styling (1 day)

**Objective:** Existing pages (including sign-up/sign-in) will look good.

- [X] create a basic style guide
- [X] create icons for `Note` and `Notebook`
  - [X] NoteAdd icon
  - [X] NoteBookAdd icon
  - [X] GarbageCan for deleting Note or Notebook
- [X] position elements on the page
- [X] add basic colors & styles

### Phase 5: Notebooks (1 day)

**Objective:** Notes belong to Notebooks, and can be viewed by notebook.

- [X] create `Notebook` model
- build out API, Flux loop, and components for:
  - [X] Notebook CRUD
  - [X] adding notes requires a notebook
  - [X] moving notes to a different notebook
  - [X] viewing notes by notebook
- Use CSS to style new views

Phase 5 adds organization to the Notes. Notes belong to a Notebook,
which has its own `Index` view.


### Phase 6: Allow Complex Styling in Notes (2 days)

**objective:** Enable complex styling of notes.

- [X] Integrate `React-Quill` Rich Text Editor component.
- [X] Style the new Quill elements.

### Phase 7: Add Searching for Notes and Notebooks (1 day)

**objective:** Enable search for text within notes and notebooks

- [X] Create `SearchIndex` Component, API, Flux loop
- [X] Create Search Icon for Navbar component
- [X] Allow User to search Notes for text

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [X] Get feedback on my UI from others
- [X] Refactor HTML classes & CSS rules
- [X] Add transitions and modals

### Bonus Features (TBD)
- [ ] Implement Responsive Web Design ( Flexbox or Media Queries)
- [ ] Tag Notes with multiple Tags
- [ ] Display Notes by Tag
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Set Reminders on Notes
- [ ] Add Shortcuts to Notebooks and Notes
- [ ] Share Notes and Notebooks with other Users (View and/or Edit)
- [ ] Chat with other Users
