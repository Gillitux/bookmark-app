import $ from 'jquery';

import 'normalize.css';
import './style.css';

import bookmarks from './bookmarks';
import store from "./store";



function main() {
  bookmarks.bindEventListeners();
  bookmarks.render();
}

$(main);