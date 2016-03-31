
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

p_note2 = patrick.notes.create!(title: "My Third note that is so long
                                this title will wrap for me baby",
                                body: "Buy milk",
                                notebook_id: 1)


g_note1 = gigi.notes.create!(title: "I love dogs",
                                body: "I'm making a dog website",
                                notebook_id: 2)

g_note2 = gigi.notes.create!(title: "Getting married",
                                body: "To the wonderful Max!",
                                notebook_id: 2)
