# Bookmark App
[Live Github](https://gillitux.github.io/bookmark-app/dist "Live Page")  
  
Demonstrates functionality of adding and removing bookmarks utilizing an API and a local database. 
## Installation
```
npm install
```
## User stories

User can add bookmarks to bookmark list. Bookmarks contain:

•  Title  
•  URL link  
•  Description  
•  Rating (1-5)  

•  User can see a list of bookmarks when they first open the app.

•  All bookmarks in the list default to a "condensed" view showing only title and rating. 

•  User can click on a bookmark to display the "detailed" view.

•  Detailed view expands to additionally display description and a "Visit Site" link.  

•  User can remove bookmarks from bookmark list.

•  User will receive appropriate feedback when they cannot submit a bookmark.

•  Check all validations in the API documentation (e.g. title and url field required).  

•  User can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection.
Use namespacing to adhere to good architecture practices


## Technical Requirements
•  Minimal global variables <br>
•  Create modules in separate files to organize your code<br>
•  Logically group your functions (e.g. API methods, store methods...)<br>
•  Keep your Data out of the DOM<br>

•  No direct DOM manipulation in your event handlers!<br>
•  Follow the React-ful design pattern - change your state, re-render your component<br>
•  Use semantic HTML<br>

•  Use a responsive and mobile-first design<br>

•  Visually and functionally solid in viewports for mobile and desktop<br>
•  Follow a11y best practices<br>

•  Refer back to the accessibility checklist and the lesson on forms<br>
