'use strict';
//variables
const inputSearch = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const container = document.querySelector('.js-list');
const url = '//api.tvmaze.com/search/shows?q=girls';
const containerFav = document.querySelector('.js-fav');

//arrays vacios de las dos secciones: encontrados y favoritos
let sectionShows = [];
let sectionFav = [];

const showsFavLS = JSON.parse(localStorage.getItem('favShows'));

//condicional si no hay nada en fav, me pone girls
if (showsFavLS !== null) {
  sectionFav = showsFavLS;
  renderFavList(sectionFav);
} else {
  getInfoApi();
}

// funcion API - fetch girls
function getInfoApi() {
  let url = `//api.tvmaze.com/search/shows?q=girls`;
  fetch(url)
    .then((response) => response.json())
    .then((dataGirls) => {
      console.log(dataGirls);
      renderShowList(dataGirls);
    });
}

//funcion preview inciar pagina
// if (sectionFav === '') {
//   container.innerHTML = getInfoApi();
// } else {
//   container.innerHTML = renderFavList;
// }

// funcion pintar una serie y fetch
function renderShows(data) {
  let html = '';
  let isFavorite = false;

  for (const fav of sectionFav) {
    if (fav.show.id === data.show.id) {
      isFavorite = true;
      break; // Termina el bucle si la serie está en favoritos
    }
  }

  html += `<ul class="list" ><li id=${
    data.show.id
  } class="box-show js-show-one ${
    isFavorite && 'selected'
  }" ><h2 class="show-title" >${data.show.name} </h2>`;
  if (data.show.image !== null) {
    html += `<img title="${data.show.name}" src="${data.show.image.medium}" alt="${data.show.name}" class="img-size">`;
  } else {
    html += `<img title="${data.show.name}" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${data.show.name}" class="img-size" />`;
  }
  html += `</li></ul>`;

  return html;
}

// funcion pintar la lista de series
function renderShowList(showList) {
  container.innerHTML = '';
  for (const oneShow of showList) {
    container.innerHTML += renderShows(oneShow);
  }
  addEventstoShows();
}

// Función para renderizar la lista de favoritos y pintarlas
function renderFavList() {
  containerFav.innerHTML = '';
  for (const favShow of sectionFav) {
    containerFav.innerHTML += renderShows(favShow);

    localStorage.setItem('favShows', JSON.stringify(sectionFav));
  }
  addEventstoShows(); // Volver a agregar eventos a las series en la lista de favoritos
}

// funcion clic fav
function handleFav(event) {
  event.preventDefault();
  const idShowClick = parseInt(event.currentTarget.id);
  console.log(idShowClick);
  //buscar la info del fav que seleccionamos, si esta lo borra y si no lo pinta
  let foundShow = sectionShows.find((item) => item.show.id === idShowClick);
  const indexFav = sectionFav.findIndex((item) => item.show.id === idShowClick);
  if (indexFav === -1) {
    sectionFav.push(foundShow);
    event.currentTarget.classList.add('selected');
  } else {
    sectionFav.splice(indexFav, 1);
    event.currentTarget.classList.remove('selected');
  }
  renderFavList(sectionFav);
}

//funcion para seleccionar todas las series que aparecen
function addEventstoShows() {
  const allShows = document.querySelectorAll('.js-show-one');
  console.log(allShows);
  for (const item of allShows) {
    item.addEventListener('click', handleFav);
  }
}

//funcion busqueda y boton
function searchShow() {
  const searchValue = inputSearch.value;
  const url2 = `https://api.tvmaze.com/search/shows?q=${searchValue}`;
  fetch(url2)
    .then((response) => response.json())
    .then((dataShows) => {
      sectionShows = dataShows;
      console.log(sectionShows);
      renderShowList(sectionShows);
    });
}

function handleSearch(event) {
  event.preventDefault();
  searchShow();
}

//evento boton buscar
btn.addEventListener('click', handleSearch);
