
User.destroy_all

guest = User.create!(email: "student@aa.io", password: "sennacy")

Notebook.destroy_all

guest_nb1 = guest.notebooks.create!(title: "Foxnote")
guest_nb2 = guest.notebooks.create!(title: "Jokes")
guest_nb3 = guest.notebooks.create!(title: "Movie Quotes")

Note.destroy_all


g_note1 = guest.notes.create!(title: "Welcome to FoxNote!",
                                  body: "FoxNote is a note-taking app which allows you to organize your notes in notebooks. Getting started is easy!\n\nClick the plus sign to add a new note\nClick the magnifying glass to search for text in all your notebooks and notes\nClick the note icon to return home and display all your notes\nClick the notebook icon to filter notes based on notebook or create a new notebook\n",
                                  notebook_id: guest_nb1.id,
                                  body_delta:  '{"ops":[{"attributes":{"size":"18px"},"insert":"FoxNote"},{"insert":" is a "},{"attributes":{"italic":true},"insert":"note-taking app"},{"insert":" which allows you to "},{"attributes":{"bold":true},"insert":"organize"},{"insert":" your "},{"attributes":{"color":"rgb(255, 255, 255)","background":"rgb(230, 0, 0)"},"insert":"notes"},{"insert":" in "},{"attributes":{"color":"rgb(255, 255, 255)","background":"rgb(0, 102, 204)"},"insert":"notebooks"},{"insert":". Getting started is "},{"attributes":{"font":"monospace"},"insert":"easy!"},{"insert":"\n"},{"attributes":{"size":"18px"},"insert":"\nClick the "},{"attributes":{"color":"rgb(255, 255, 255)","background":"rgb(153, 51, 255)","size":"18px"},"insert":"plus sign"},{"attributes":{"size":"18px"},"insert":" to "},{"attributes":{"color":"rgb(255, 255, 255)","background":"rgb(107, 36, 178)","size":"18px"},"insert":"add a new note"},{"attributes":{"list":true,"size":"18px"},"insert":"\n"},{"attributes":{"size":"18px"},"insert":"Click the "},{"attributes":{"color":"rgb(0, 102, 204)","background":"rgb(255, 255, 0)","size":"18px"},"insert":"magnifying glass"},{"attributes":{"size":"18px"},"insert":" to "},{"attributes":{"color":"rgb(255, 255, 0)","background":"rgb(0, 102, 204)","size":"18px"},"insert":"search"},{"attributes":{"size":"18px"},"insert":" for text in all your notebooks and notes"},{"attributes":{"list":true,"size":"18px"},"insert":"\n"},{"attributes":{"size":"18px"},"insert":"Click the "},{"attributes":{"color":"rgb(204, 224, 245)","background":"rgb(161, 0, 0)","size":"18px"},"insert":"note icon"},{"attributes":{"size":"18px"},"insert":" to return home and "},{"attributes":{"color":"rgb(255, 255, 255)","background":"rgb(230, 0, 0)","size":"18px"},"insert":"display all your notes"},{"attributes":{"list":true,"size":"18px"},"insert":"\n"},{"attributes":{"size":"18px"},"insert":"Click the "},{"attributes":{"color":"rgb(0, 41, 102)","background":"rgb(250, 204, 204)","size":"18px"},"insert":"notebook icon"},{"attributes":{"size":"18px"},"insert":" to "},{"attributes":{"bold":true,"size":"18px"},"insert":"filter"},{"attributes":{"size":"18px"},"insert":" notes based on notebook or "},{"attributes":{"color":"rgb(0, 138, 0)","background":"rgb(255, 235, 204)","size":"18px"},"insert":"create a new notebook"},{"attributes":{"list":true},"insert":"\n"}]}')

g_note2 = guest.notes.create!(title: "Rich Text",
                                  body: "FoxNote allows you to apply styling to your notes. Give it a try, this note is a little bland!",
                                  notebook_id: guest_nb1.id,
                                  body_delta: '{"ops":[{"insert": "FoxNote allows you to apply styling to your notes. Give it a try, this note is a little bland!"}]}')


g_note3 = guest.notes.create!(title: "Revenge of the Sith",
                                body:  "You were the chosen one! It was said that you would destroy the Sith, not join them.\n \nYou were to: \n\nbring balance to the force \nnot leave it in darkness\n",
                                notebook_id: guest_nb3.id,
                                body_delta:  '{"ops":[{"attributes":{"color":"rgb(106, 106, 106)","font":"arial, sans-serif","size":"small"},"insert":"You were the "},{"attributes":{"bold":true,"italic":true,"color":"rgb(106, 106, 106)","font":"arial, sans-serif","size":"small"},"insert":"chosen"},{"attributes":{"color":"rgb(106, 106, 106)","font":"arial, sans-serif","size":"small"},"insert":" one"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"! It was said that you would "},{"attributes":{"color":"rgb(255, 153, 0)","background":"rgb(230, 0, 0)","font":"monospace","size":"small"},"insert":"destroy"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" the "},{"attributes":{"color":"rgb(0, 138, 0)","background":"rgb(0, 0, 0)","font":"arial, sans-serif","size":"small"},"insert":"Sith"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":", not "},{"attributes":{"bold":true,"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"join"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" them."},{"insert":"\n"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" "},{"insert":"\n"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"You were to: "},{"insert":"\n\n"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"bring "},{"attributes":{"color":"rgb(84, 84, 84)","font":"serif","size":"small"},"insert":"balance"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" to the "},{"attributes":{"underline":true,"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"force"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":" "},{"attributes":{"list":true},"insert":"\n"},{"attributes":{"color":"rgb(84, 84, 84)","font":"arial, sans-serif","size":"small"},"insert":"not leave it in "},{"attributes":{"bold":true,"color":"rgb(255, 255, 102)","background":"rgb(136, 136, 136)","font":"arial, sans-serif","size":"small"},"insert":"darkness"},{"attributes":{"list":true},"insert":"\n"}]}'
                                )


g_note4 = guest.notes.create!(title: "Mitch Hedberg",
                                body: "My fake plants died because I did not pretend to water them.",
                                notebook_id: guest_nb2.id,
                                body_delta: '{"ops":[{"insert": "My fake plants died because I did not pretend to water them."}]}')

g_note5 = guest.notes.create!(title: "George Carlin",
                                body: "Think of how stupid the average person is, and realize half of them are stupider than that.",
                                notebook_id: guest_nb2.id,
                                body_delta: '{"ops":[{"insert": "Think of how stupid the average person is, and realize half of them are stupider than that."}]}')

g_note6 = guest.notes.create!(title: "Computers",
                                body: "The meal isn't over when I'm full, the meal is over when I hate myself",
                                notebook_id: guest_nb2.id,
                                body_delta: '{"ops":[{"insert":"There are 10 kinds of people in the world: those that understand binary, and those that do not."}]}')
