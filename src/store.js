const store = {
  bookmarks: [
    {
      title: 'Google',
      URL: 'https://www.google.com',
      description: '',
      rating: 4,
      view: 'condensed'
    }],
};

// --for user story "I can remove bookmarks from my bookmark list"
//filters through the bookmarks in the store
//creates a new array containing all items that are not equal to the current item.
/*const findAndDelete = function (bookmark) {
  this.store.bookmarks = this.store.bookmarks.filter(currentItem => currentItem.title !== bookmark);
};
*/
export default {
  store
  //findAndDelete
};