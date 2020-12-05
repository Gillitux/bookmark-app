/* eslint-disable no-console */
import $ from 'jquery';
import store from './store';
import api from './api';




function render() {
  if (store.store.adding) {
    let html = generateListView();
    let headerHtml = generateNewBookmarkForm();
    $('header').html(headerHtml);
    $('main').html(html);
  } else {
    let html = generateListView();
    let headerHtml = generateHeader();
    $('header').html(headerHtml);
    $('main').html(html);
  }
}

$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});

function renderError() {

}

/*================generate page functions================*/

function generateDetailView() {


  return `
  <div class="expanded">
    <form class = "deleteButton">
      <button id="delete" type="button">Remove Bookmark</button>
    </form>
    <h2>${myStore[i].title}</h2>
    <a href="${myStore[i].URL}"  target="_blank">visit this page</a>

    <span>${myStore[i].rating}</span>

    <form class="expandButton">
    <button id="expand" type="button">See more</button>
    </form>

  </div>
  
  <hr>`;

}


function generateHeader() {
  return `
  <div class="pageOptions">
    <form class="filterMenu">
        <select id="filterResults" name="filterResults">
          <option value="">Filter results...</option>
          <option value="1 star">1+ stars</option>
          <option value="2 star">2+ stars</option>
          <option value="3 star">3+ stars</option>
          <option value="4 star">4+ stars</option>
          <option value="5 star">5 stars</option>
        </select>
      </form>


      <form class="newBookmark">
      <button class="createNew" type="button">Create New Bookmark</button>
      </form>
      </div>`;
}

function generateNewBookmarkForm() {
  return `<form class="filterMenu">
      <select id="filterResults" name="filterResults">
        <option value="">Filter results...</option>
        <option value="1 star">1+ stars</option>
        <option value="2 star">2+ stars</option>
        <option value="3 star">3+ stars</option>
        <option value="4 star">4+ stars</option>
        <option value="5 star">5 stars</option>
      </select>
    </form>

  <div class="addBookmark"
    <form id="newBookmark">

    <label for="title">Title:</label>
    <input type="text"  class="title" name="title">
    <label for="newUrl">URL:</label>
    <input type="text"  class="newUrl" name="newUrl">
    <label for="description">Description:</label>
    <input type="text"  class="description" name="description">

    <select class="newRating" name="newRating">
      <option value="">Rating:</option>
      <option value="1">1 stars</option>
      <option value="2">2 stars</option>
      <option value="3">3 stars</option>
      <option value="4">4 stars</option>
      <option value="5">5 stars</option>
    </select>

    <button type="button" class="submitNew">submit</button>
    </form>
  </div>`
}

function generateBookmarkView(item){
  console.log(item);
  return `
  <div class="condensed">
    <form class = "deleteButton">
      <button id="delete" type="button">Remove Bookmark</button>
    </form>
    <h2>${item.title}</h2>
    <span>${item.rating}</span>

    <form class="expandButton">
    <button id="expand" type="button">See more</button>
    </form>

  </div>
  
  <hr>`;
}


function generateListView() {
  let myStore = (store.store.bookmarks);
  const newStore = myStore.map(bookmark=>
  generateBookmarkView(bookmark))
  console.log(myStore);
  return newStore.join('');
}


/*================event handlers================*/


function handleNewBookmark() {
  $('header').on('click', '.createNew', event => {
    store.store.adding = true;
    render();
    console.log('hello');
    //event.currentTarget.serializeJson();
  });
}


function handleSubmitAddNewBookmark() {
  $('header').on('click', '.submitNew', event => {
    event.preventDefault();
    //add description and rating
    let newBookmark = { title: $('.title').val(), url: $('.newUrl').val(), desc: $('.description').val(), rating: $('.newRating').val()}
    console.log(newBookmark);
    
    
    //get form elements by id or class, then do .val()
    //build up bookmark object with those values
    api.createBookmark(JSON.stringify(newBookmark))
      .then(response => {
        if (response.message) {
          store.setError(true);
          renderError();
        }
        else {
          store.setError(null)
          store.addBookmark(response)
          store.store.adding = !store.store.adding
          render();
        }
      })
  })
}

function handleDeleteBookmark() {


    }


function handleFilterView() {
    }

/*================pack up and export================*/

const bindEventListeners = function () {
    handleNewBookmark();
    handleDeleteBookmark();
    handleFilterView();
    handleSubmitAddNewBookmark();
  };

  export default {
    bindEventListeners,
    render
  };