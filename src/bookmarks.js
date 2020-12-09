import $ from 'jquery';
import store from './store';
import api from './api';


function render() {
  if (store.store.adding) {
    let html = generateMain([...store.store.bookmarks]);
    let headerHtml = generateNewBookmarkForm();
    $('header').html(headerHtml);
    $('main').html(html);
    renderError();
  } else if (store.store.filter !== null) {
    const filteredBookmarks = [...store.store.bookmarks].filter(bmk => bmk.rating >= parseInt(store.store.filter))
    let html = generateMain(filteredBookmarks);
    let headerHtml = generateHeader();
    $('header').html(headerHtml);
    $('main').html(html);
  }
  else {
    let html = generateMain([...store.store.bookmarks]);
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




/*================generate page functions================*/
function generateMain(myStore) {
  const newStore = myStore.map(bookmark =>
    generateBookmarks(bookmark))
  return newStore.join('');
}

function generateBookmarks(item) {
  return `
  <div class="condensed" data-item-id="${item.id}">
    <form class = "deleteButton">
      <button class="delete" type="button">Remove Bookmark</button>
    </form>
    <h2>${item.title}</h2>
    <div class="${item.expanded ? 'expanded' : 'hidden'}">
    <a href="${item.url}"  target="_blank">visit this page</a>
    <p>${item.desc}</p>
    </div>
    <span>${item.rating}</span>

    <form class="expandButton">
    <button class="expand" type="button">
    ${!item.expanded ? 'Show details' : 'Show less'}
    </button>
    </form>

  </div>
  
  <hr>`;
}


function generateHeader() {
  return `
  <h1>My Bookmarks</h1>
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
  return `

    <div class="addBookmark">
      <form id="newBookmark">
      <br>
      <div class="error-message"></div>
      <label for="title">Title:</label>
      <input type="text"  class="title" name="title" required/>
      <label for="newUrl">URL:</label>
      <input type="url"  class="newUrl" name="newUrl"  placeholder="https://" required/>
      <label for="description">Description:</label>
      <input type="text"  class="description" name="description"/>
      <br>

      <label>
      <select name="rating" id="rating" class="rating">
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
      <input type="submit" class="submitNew"/>
      <button type="submit" class="cancel">Cancel</button>
      </section>
      
      </form>
  
    </div>`
}

const generateError = function (message) {
  return `
        <section class="error-content">
        <p>Something went wrong: ${message}</p>
        </section>
      `;
};
/*================event handlers================*/


function handleNewBookmark() {
  $('header').on('click', '.createNew', event => {
    store.store.adding = true;
    render();
  });
}


function handleSubmitNewBookmark() {
  $('header').on('submit', 'form#newBookmark', event => {
    event.preventDefault();

    let newBookmark = { title: $('.title').val(), url: $('.newUrl').val(), desc: $('.description').val(), rating: $('.rating').val() }

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
  })
}

const getItemIdFromElement = function (item) {
  return $(item)
    .closest('.condensed')
    .data('item-id')
}

function handleDeleteBookmark() {
  $('main').on('click', '.delete', function (event) {
    const id = getItemIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id)
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
};

function handleCancelNew() {
  $('header').on('click', '.cancel', function () {
    store.store.adding = !store.store.adding;
    render();
  })
}
function handleExpandBookmark() {
  $('main').on('click', '.expand', event => {
    const id = getItemIdFromElement(event.currentTarget);
    const thisBookmark = store.findById(id);
    if (thisBookmark)


      thisBookmark.expanded = !thisBookmark.expanded;
    render();
  })
}


function handleFilter() {
  $('header').on('change', '#filter', function () {
    let filter = $('.filter option:selected').val();
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