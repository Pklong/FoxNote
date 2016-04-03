
User.destroy_all

patrick = User.create!(email: "patrick@aa.io", password: "password")
gigi = User.create!(email: "gigi@aa.io", password: "password")

Note.destroy_all

p_note1 = patrick.notes.create!(title: "My First Note",
                                body: "Feeling good about this note",
                                notebook_id: 1)

p_note2 = patrick.notes.create!(title: "My Second Note",
                                body: "Buy milk",
                                notebook_id: 1)

p_note3 = patrick.notes.create!(title: "My Third note that is so long
                                this title will wrap for me baby",
                                body: "Buy milk",
                                notebook_id: 1)
p_note4 = patrick.notes.create!(title: "I love Amy!",
                                body: "Buy milk",
                                notebook_id: 2)



g_note1 = gigi.notes.create!(title: "I love dogs",
                                body: "I'm making a dog website",
                                notebook_id: 2)

g_note2 = gigi.notes.create!(title: "Getting married",
                                body: "To the wonderful Max!",
                                notebook_id: 2)

Notebook.destroy_all

p_nb1 = patrick.notebooks.create!(title: "First notebook")

p_nb2 = patrick.notebooks.create!(title: "Second notebook")

p_nb3 = patrick.notebooks.create!(title: "Third notebook")
