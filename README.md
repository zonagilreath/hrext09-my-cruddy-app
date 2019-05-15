# hrext09-my-cruddy-app
Create Read Update and Delete framework using JS
This project will be a very simple comic books database.
I have built a few CRUD apps before, especially the backends of them, so I intend to focus on style/UX.
The first MVP will be a well-presented database using local storage to CRUD comic book objects.
Each book will have detail data like series, issue number, writer, penciller, etc. 
The second MVP will incorporate creator objects (writers, artists, etc) so that books and creators are linked to each other. 
The third MVP will be migrating the app to firebase so that it is live data (with the app itself hosted on github pages).
Finally, time permitting I will try to incorporate user authentication/permissions to limit who can CUD data, vs who can read-only. 

 ## Tasks

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
	- [ ] Comic book data model
	- [ ] Initial data loader 
- [ ] How to caputure data? (web form)
- [ ] How to modify data? (update action, delete action)
- [ ] How to view data? (style?)
- [ ] UI/UX considerations (how are we going to use this)

 ### Advanced Reqs
- [ ] Author data model
	- [ ] Linking between book and author objects
	- [ ] Searching by either book or author
- [ ] Searching by either book or author
- [ ] Move data to firebase
	- [ ] point CRUD functions to firebase
- [ ] point CRUD functions to firebase
- [ ] User data model (object in db with username and password, won't be secure/encrypted, just practice)