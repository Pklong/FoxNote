
User.destroy_all

patrick = User.create!(email: "patrick@aa.io", password: "password")
guest = User.create!(email: "student@aa.io", password: "sennacy")

Notebook.destroy_all

p_nb1 = patrick.notebooks.create!(title: "First notebook")
p_nb2 = patrick.notebooks.create!(title: "Second notebook")

guest_nb1 = guest.notebooks.create!(title: "Foxnote")
guest_nb2 = guest.notebooks.create!(title: "Jokes")

Note.destroy_all

p_note1 = patrick.notes.create!(title: "My First Note",
                                body: "Feeling good about this note",
                                notebook_id: p_nb1.id)

p_note2 = patrick.notes.create!(title: "My goodness!",
                                body: "Gracious",
                                notebook_id: p_nb1.id)

p_note3 = patrick.notes.create!(title: "To Do",
                                body: "Buy milk",
                                notebook_id: p_nb2.id)

p_note4 = patrick.notes.create!(title: "I love Amy!",
                                body: "Buy milk",
                                notebook_id: p_nb2.id)

g_note1 = guest.notes.create!(title: "I love foxnote",
                                  body: "It's awesome",
                                  notebook_id: guest_nb1.id)

g_note2 = guest.notes.create!(title: "EVERYTHING IS BROKEN",
                                  body: "Noooooooo!",
                                  notebook_id: guest_nb1.id)

g_note3 = guest.notes.create!(title: "Anakin",
                                body: "Noooooooo!",
                                notebook_id: guest_nb1.id)

g_note3 = guest.notes.create!(title: "Mitch Hedberg",
                                body: "My fake plants died because I did not pretend to water them.",
                                notebook_id: guest_nb2.id)
g_note4 = guest.notes.create!(title: "George Carlin",
                                body: "Think of how stupid the average person is, and realize half of them are stupider than that.",
                                notebook_id: guest_nb2.id)
