
User.destroy_all

patrick = User.create!(email: "patrick@aa.io", password: "password")
guest = User.create!(email: "student@aa.io", password: "sennacy")

Notebook.destroy_all

p_nb1 = patrick.notebooks.create!(title: "First notebook")
p_nb2 = patrick.notebooks.create!(title: "Second notebook")

guest_nb1 = guest.notebooks.create!(title: "Foxnote")

Note.destroy_all

p_note1 = patrick.notes.create!(title: "My First Note",
                                body: "Feeling good about this note",
                                notebook_id: p_nb1.id)

p_note2 = patrick.notes.create!(title: "My Second Note",
                                body: "Buy milk",
                                notebook_id: p_nb1.id)

p_note3 = patrick.notes.create!(title: "My Third note that is so long
                                this title will wrap for me baby",
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
