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

Minimal global variables
Create modules in separate files to organize your code
Logically group your functions (e.g. API methods, store methods...)
Keep your Data out of the DOM

No direct DOM manipulation in your event handlers!
Follow the React-ful design pattern - change your state, re-render your component
Use semantic HTML

Use a responsive and mobile-first design

Visually and functionally solid in viewports for mobile and desktop
Follow a11y best practices

Refer back to the accessibility checklist and the lesson on forms




Fulfill every non-extension user story below
Fulfill every non-extension technical requirement below

For successful submission, you MUST:

  -Push your final version to the gh-pages branch of your repo. Your repo should be inside the cohort's organization and named [yourname]-bookmarks-app.
  -Add the live GH Pages link to the header of your repo.
  -Create a README.md file that contains a full list of all user stories completed.
  -Submit the repo URL at the bottom of this page.
