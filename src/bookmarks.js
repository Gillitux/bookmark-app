import $ from 'jquery';
import store from './store';

function generateDetailView (){

}


function addBookmark(){

}




function handleDeleteBookmark (){
  $('.deleteButton').on('click', '#delete', e=>
  
    console.log('i am listening')
  );
}


function handleFilterView (){

}

function generateBookmarksView() {
  let myStore = $(store.store.bookmarks);
  for (let i = 0; i < myStore.length; i++)
    return `<div class="staticHeader">
    
    <form id="filter">
      <select id="filterResults" name="filterResults">
        <option value="">Filter results...</option>
        <option value="1 star">1+ stars</option>
        <option value="2 star">2+ stars</option>
        <option value="3 star">3+ stars</option>
        <option value="4 star">4+ stars</option>
        <option value="5 star">5 stars</option>
      </select>
    </form>


    <form id="newBookmark">
    <button id="createNew" type="submit">Create New Bookmark</button>
    </form>

    </div>

    <hr>

    <div class="condensed">
      <form class = "deleteButton">
        <button id="delete">Remove Bookmark</button>
      </form>
      <h2>${myStore[i].title}</h2>
      <a href="${myStore[i].URL}"  target="_blank">visit this page</a>
      <span>${myStore[i].rating}</span>

      <form class="expandButton">
      <button id="expand">See more</button>
      </form>

    </div>
    
    <hr>`;
}

function handleNewBookmark() {
  $('main').on('submit', '#createNew', event => {
    event.preventDefault();
    console.log("hello");
    render();
  });
}

function render() {
  let html = generateBookmarksView();
  $('main').html(html);
}

const bindEventListeners = function () {
  handleNewBookmark();
};

export default {
  bindEventListeners,
  render
};