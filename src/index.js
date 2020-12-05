import $ from 'jquery';

import 'normalize.css';
import './index.css';

import bookmarksPage from './bookmarks';
import api from './api';
import store from './store';



//fetching bookmarks from api and adding them to the store array
const main = function () {
  api.getBookmark()
    .then((items) => {
      console.log(items);
      items.forEach((item) => store.addBookmark(item));
      items.forEach((item) => item.expanded = false);
      bookmarksPage.render();
    });
  bookmarksPage.bindEventListeners();
  bookmarksPage.render();
};

$(main);