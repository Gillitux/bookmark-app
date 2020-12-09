# Bookmark App
[Live Github](https://thinkful-ei-unicorn.github.io/tucker-gilligan-bookmarks-app/dist "Live Page")

Demonstrates functionality of adding and removing bookmarks utilizing an API and a local database.

## Installation

```
npm install
```

## User Stories

User can add bookmarks to the bookmark list. Bookmarks contain:
* Title
* URL Link
* Description
* Rating
* User can see a list of bookmarks when they first open the app.
* All bookmarks in the list default to a "condensed" view showing only title and rating.
* User can click on a bookmark to display the "detailed" view.
* Detailed view expands to additionally display description and a "visit site" link.
* User can remove bookmarks from their bookmark list.
* User will receive appropriate feedback when they cannot submit a bookmark.
* Check all validations in the API documentation (e.g. title and url field required)
* User can select from a dropdown menu (a \<select\> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection.

## Technical Requirements

* Use namespacing to adhere to good architecture practices
* Minimal global variables
* reate modules in separate files to organize your code
* Logically group your functions (e.g. API methods, store methods...)
* Keep your Data out of the DOM
* No direct DOM manipulation in your event handlers!
* Follow the React-ful design pattern - change your state, re-render your component
* Use semantic HTML
* Use a responsive and mobile-first design
* Visually and functionally solid in viewports for mobile and desktop
* Follow a11y best practices
* Refer back to the accessibility checklist and the lesson on forms
