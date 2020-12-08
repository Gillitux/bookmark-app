/* eslint-disable no-console */
import $ from 'jquery';
import store from './store';
import api from './api';


function render() {
/*  let bookmarks=[];
  if(store.store.filter>0){
    bookmarks=store.store.bookmarks.filter(
      (bookmark)=>bookmark.rating >= store.store.filter
    );
  } else {
    bookmarks = store.store.bookmarks
  }



  if (store.store.adding){
    let headerHtml = generateNewBookmarkForm();
    $('header').html(headerHtml);
  }
  else{
    let headerHtml= generateHeader()
  }
  const html = generateMain(bookmarks);

  $('header').html(headerHtml);
  $('main').html(html);

}
*/



  if (store.store.adding) {
    let html = generateListView();
    let headerHtml = generateNewBookmarkForm();
    $('header').html(headerHtml);
    $('main').html(html);
    renderError();
  } else {
    let html = generateListView();
    let headerHtml = generateHeader();
    $('header').html(headerHtml);
    $('main').html(html);
    renderError();
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

const renderError = function () {
  if (store.store.error) {
    const e = generateError(store.store.error);
    $('.error-message').html(e);
  } else {
    $('.error-message').empty();
  }
};


const generateError = function (message) {
  return `
        <section class="error-content">
        <p>Something went wrong: ${message}</p>
        </section>
      `;
};

/*================generate page functions================*/
function generateListView() {
  let myStore = (store.store.bookmarks);

  const newStore = myStore.map(bookmark=>
  generateBookmarks(bookmark))
  console.log(myStore);
  return newStore.join('');
}


function generateMain(bookmark){
  if (bookmark.rating >= store.store.filter){
    if (!bookmark.expanded){
      return generateBookmarks()
    }
    else {
      return generateDetailView()
    }
  }
}


function generateBookmarks(item){
  return `
  <div class="condensed" data-item-id="${item.id}">
    <form class = "deleteButton">
      <button id="delete" type="button">Remove Bookmark</button>
    </form>
    <h2>${item.title}</h2>
    <div class="${item.expanded ? 'expanded' : 'hidden'}">
    <a href="${item.url}"  target="_blank">visit this page</a>
    <p>${item.desc}</p>
    </div>
    <span>${item.rating}</span>

    <form class="expandButton">
    <button id="expand" type="button">
    ${!item.expanded ? 'Show details' : 'Show less'}
    </button>
    </form>

  </div>
  
  <hr>`;
}

/*
function generateDetailView(item) {


  return `
  <div class="expanded" data-item-id="${item.id}">
    <form class = "deleteButton">
      <button id="delete" type="button">Remove Bookmark</button>
    </form>
    <h2>${item.title}</h2>
    <a href="${item.URL}"  target="_blank">visit this page</a>
    <p>${item.desc}</p>
    <p>${item.rating}</p>
  </div>
  
  <hr>`;

}
*/


function generateHeader() {
  return `
  <div class="pageOptions">
    <label>
    <select name="filter" id="filter" class="filter">
    <option>Filter</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </select>
    </label>

      <form class="newBookmark">
      <button class="createNew" type="button">Create New Bookmark</button>
      </form>
      </div>`;
}

function generateNewBookmarkForm() {
  //add conditional for error
  
    return `

    <div class="addBookmark"
      <form id="newBookmark">
      <br>
      <div class="error-message"></div>
      <label for="title">Title:</label>
      <input type="text"  class="title" name="title"  required>
      <label for="newUrl">URL:</label>
      <input type="url"  class="newUrl" name="newUrl"  placeholder="https://" required>
      <label for="description">Description:</label>
      <input type="text"  class="description" name="description">
      <br>

      <label>
      <select name="rating" id="rating" class="rating"  >
      <option>Bookmark Rating</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      </select>
      </label>
      <br>
      <section class="formButtons">
      <input type="submit" class="submitNew"></input>
      <button type="button" class="cancel">Cancel</button>
      </section>
      
      </form>
  
    </div>`
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



function handleSubmitNewBookmark() {
  $('header').on('click', '.submitNew', event => {
    event.preventDefault();
    console.log('testing 123')
    //add description and rating
    let newBookmark = { title: $('.title').val(), url: $('.newUrl').val(), desc: $('.description').val(), rating: $('.rating').val()}
    console.log(newBookmark);    
    
    //get form elements by id or class, then do .val()
    //build up bookmark object with those values
    api.createBookmark(JSON.stringify(newBookmark))
      .then(response => {
        if (response.message) {
          store.setError(error.message);
          renderError();
        }
        else {
          store.setError(null)
          store.addBookmark(response)
          store.store.adding = !store.store.adding
          render();
        }
      })
      .catch((error) => {
        store.setError(error.message)
        render();
      });
      //add a catch error that changes value of error to message then call render
  })
}

const getItemIdFromElement = function(item){
  return $(item)
    .closest('.condensed')
    .data('item-id')
}

function handleDeleteBookmark() {
  $('main').on('click', '#delete', function(event){
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
    .then(() =>{
      store.findAndDelete(id)
      render();
    })
    .catch((error) => {
      store.setError(error.message);
      renderError();
    });
  });
};

function handleCancelNew(){
  $('header').on('click', '.cancel', function(){
    store.store.adding = !store.store.adding;
    render();
    console.log('cancel button is working')
  })
}
function handleExpandBookmark(){
  $('main').on('click','#expand', event=>{
    const id = getItemIdFromElement(event.currentTarget);
    const thisBookmark = store.findById(id);
    if(thisBookmark)
    
    
    thisBookmark.expanded = !thisBookmark.expanded;
    render();
    console.log('expand button is working')
  })
}


function handleFilter() {
  $('#filter').on('change', function(){
    let filter=$('.filter option:selected').val();
    store.store.filter = filter;
    render();
  })
}

/*================pack up and export================*/

const bindEventListeners = function () {
    handleNewBookmark();
    handleDeleteBookmark();
    handleFilter();
    handleSubmitNewBookmark();
    handleExpandBookmark();
    handleCancelNew();
  };

  export default {
    bindEventListeners,
    render
  };