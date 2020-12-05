const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};


console.log(store.bookmarks);
const findById = function (id) {
  return store.bookmarks.find(currentItem => currentItem.id === id);
};

function findAndUpdate(id, newData) {
  const updateItem = store.bookmarks.find(item => item.id === id);
  Object.assign(updateItem, newData);
}

const addBookmark = function (item) {
  store.bookmarks.push(item);
};

const setError = function (error) {
  store.error = error;
};

const findAndDelete = function (id) {
  store.bookmarks = store.bookmarks.filter(bookmarks => bookmarks.id !== id);
};

export default {
  store,
  findById,
  addBookmark,
  findAndUpdate,
  findAndDelete,
  setError,
};

// --for user story "I can remove bookmarks from my bookmark list"
//filters through the bookmarks in the store
//creates a new array containing all items that are not equal to the current item.
/*const findAndDelete = function (bookmark) {
  store.store.bookmarks = store.store.bookmarks.filter(currentItem => currentItem.title !== bookmark);
};
*/
