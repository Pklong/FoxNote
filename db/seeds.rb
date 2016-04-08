
User.destroy_all

patrick = User.create!(email: "patrick@aa.io", password: "password")
guest = User.create!(email: "student@aa.io", password: "sennacy")

Notebook.destroy_all

p_nb1 = patrick.notebooks.create!(title: "First notebook")
p_nb2 = patrick.notebooks.create!(title: "Second notebook")

guest_nb1 = guest.notebooks.create!(title: "Foxnote")
guest_nb2 = guest.notebooks.create!(title: "Jokes")
guest_nb3 = guest.notebooks.create!(title: "Jbuilder")

Note.destroy_all

p_note1 = patrick.notes.create!(title: "My First Note",
                                body: "Feeling good about this note",
                                notebook_id: p_nb1.id,
                                body_delta: '{"ops":[{"insert": "Feeling good about this note"}]}')

p_note2 = patrick.notes.create!(title: "My goodness!",
                                body: "Gracious",
                                notebook_id: p_nb1.id,
                                body_delta: '{"ops":[{"insert": "Gracious"}]}')

p_note3 = patrick.notes.create!(title: "To Do",
                                body: "Buy milk",
                                notebook_id: p_nb2.id,
                                body_delta: '{"ops":[{"insert": "Buy milk"}]}')

p_note4 = patrick.notes.create!(title: "I love Amy!",
                                body: "She is the best",
                                notebook_id: p_nb2.id,
                                body_delta: '{"ops":[{"insert": "She is the best"}]}')

g_note1 = guest.notes.create!(title: "I love foxnote",
                                  body: "It is awesome",
                                  notebook_id: guest_nb1.id,
                                  body_delta: '{"ops":[{"insert": "It is awesome"}]}')

g_note2 = guest.notes.create!(title: "Tommy is very cool",
                                  body: "I bet that guy could fight like twenty thirty bandits?\n",
                                  notebook_id: guest_nb1.id,
                                  body_delta: '{"ops":[{"attributes":{"font":"monospace","size":"18px"},"insert":"I bet that guy could fight like "},{"attributes":{"strike":true,"font":"monospace","size":"18px"},"insert":"twenty"},{"attributes":{"font":"monospace","size":"18px"},"insert":" "},{"attributes":{"font":"monospace","size":"18px","underline":true},"insert":"thirty"},{"attributes":{"font":"monospace","size":"18px"},"insert":" bandits?"},{"insert":"\n"}]}'
                                  )


g_note3 = guest.notes.create!(title: "Disappointed in Anakin",
                                body:  "You were the chosen one! It was said that you would destroy the Sith, not join them.\n \nYou were to: \n\nbring balance to the force \nnot leave it in darkness\n",
                                notebook_id: guest_nb1.id,
                                body_delta:  '{"ops":[{"attributes":{"color":"rgb(106, 106, 106)","font":"arial, sans-serif","size":"small"},"insert":"You were the "},{"attributes":{"bold":true,"italic":true,"color":"rgb(106, 106, 106)","font":"arial, sans-serif","size":"small"},"insert":"chosen"},{"attributes":{"color":"rgb(106, 106, 106)","font":"arial, sans-serif","size":"small"},"insert":" one"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"! It was said that you would "},{"attributes":{"color":"rgb(255, 153, 0)","background":"rgb(230, 0, 0)","font":"monospace","size":"small"},"insert":"destroy"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" the "},{"attributes":{"color":"rgb(0, 138, 0)","background":"rgb(0, 0, 0)","font":"arial, sans-serif","size":"small"},"insert":"Sith"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":", not "},{"attributes":{"bold":true,"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"join"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" them."},{"insert":"\n"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" "},{"insert":"\n"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"You were to: "},{"insert":"\n\n"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"bring "},{"attributes":{"color":"rgb(84, 84, 84)","font":"serif","size":"small"},"insert":"balance"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" to the "},{"attributes":{"underline":true,"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"force"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" "},{"attributes":{"list":true},"insert":"\n"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"not leave it in "},{"attributes":{"bold":true,"color":"rgb(255, 255, 102)","background":"rgb(136, 136, 136)","font":"arial, sans-serif","size":"small"},"insert":"darkness"},{"attributes":{"list":true},"insert":"\n"}]}'
                                )


g_note3 = guest.notes.create!(title: "Mitch Hedberg",
                                body: "My fake plants died because I did not pretend to water them.",
                                notebook_id: guest_nb2.id,
                                body_delta: '{"ops":[{"insert": "My fake plants died because I did not pretend to water them."}]}')

g_note4 = guest.notes.create!(title: "George Carlin",
                                body: "Think of how stupid the average person is, and realize half of them are stupider than that.",
                                notebook_id: guest_nb2.id,
                                body_delta: '{"ops":[{"insert": "Think of how stupid the average person is, and realize half of them are stupider than that."}]}')

g_note5 = guest.notes.create!(
title: "Overview",
body: "Things to know about JBuilder\n\nblack magic\nwhat is it really?\nplease explain jbuilder, I think it's javascript, json?, RUBY!\n",
notebook_id: guest_nb3.id,
body_delta:'{"ops":[{"attributes":{"font":"monospace"},"insert":"Things to know about JBuilder"},{"insert":"\n"},{"attributes":{"color":"rgb(255, 255, 255)","background":"rgb(0, 0, 0)"},"insert":"black"},{"insert":" "},{"attributes":{"italic":true},"insert":"magic"},{"attributes":{"bullet":true},"insert":"\n"},{"insert":"what is it really?"},{"attributes":{"bullet":true},"insert":"\n"},{"insert":"please explain jbuilder, I think its "},{"attributes":{"strike":true},"insert":"javascript"},{"insert":", "},{"attributes":{"italic":true},"insert":"json?"},{"insert":", "},{"attributes":{"color":"rgb(230, 0, 0)"},"insert":"RUBY!"},{"attributes":{"bullet":true},"insert":"\n"}]}'
)
