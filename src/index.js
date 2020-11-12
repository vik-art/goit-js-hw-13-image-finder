import './styles.css';
import ImageApiService from './apiservice';
import imagesTpl from './templates/imageTpl.hbs';
import LoadMoreBtn from './load-more-btn';

import { inform, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const formRef = document.querySelector('.js-search-form');
const galleryRef = document.querySelector('.js-gallery');
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImageApiService();

formRef.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadMoreImages)

function onSearch(e) {
    e.preventDefault();
    imageApiService.query = e.currentTarget.elements.query.value;
    if(imageApiService.query === "") {
        return inform ({
          text: 'Please, enter the value',
          delay: 2000,
          closeHover: true,
        })
    }
    loadMoreBtn.show();
    imageApiService.resetPage();
    clearImageContainer();
    fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  return imageApiService.fetchImages().then(images => {
      appendArticlesMarkup(images);
      loadMoreBtn.enable();

      if(images.length === 0) {
        loadMoreBtn.hide();
        error ({
          text: 'No matches found. Please, enter another value',
          delay: 2000,
          closerHover: true,
        })
      }
    });
  }
  
  function appendArticlesMarkup(images) {
    galleryRef.insertAdjacentHTML('beforeend', imagesTpl(images));
  }

function clearImageContainer() {
  galleryRef.innerHTML = "";
}


function loadMoreImages() {
  fetchImages()
  .then (
    setTimeout(() => {
        window.scrollBy({
            top: document.documentElement.clientHeight - 100,
            behavior: "smooth",
})
    }, 2000)
  ).catch(error=>(console.log("error")))
}