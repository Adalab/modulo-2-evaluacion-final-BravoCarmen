'use strict';
//variables
const inputSearch = document.querySelector('.js-input');
const btn = document.querySelector('.js-btn');
const container = document.querySelector('.js-list');
const url = '//api.tvmaze.com/search/shows?q=girls';

//arrays vacios de las dos secciones: encontrados y favoritos
let series = [];
// sectionFav = [];

// funcion API - fetch y pintar en html
function getInfoApi() {
  let url = `//api.tvmaze.com/search/shows?q=girls`;
  fetch(url)
    .then((response) => response.json())
    .then((dataAPI) => {
      console.log(dataAPI);
      renderShowList(dataAPI);
    });
}
getInfoApi();

function renderShows(series) {
  let html = '';
  html += `<li class="show"> <div> <h2>${series.show.name}</h2>`;
  if (series.show.image !== null) {
    html += `<img title="${series.show.name}" src="${series.show.image.medium}" alt="${series.show.name}">`;
  } else {
    html += `<img title="${series.show.name}" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${series.show.name}"/>`;
  }
  html += `</div> </li>`;

  return html;
}

function renderShowList(showList) {
  for (const series of showList) {
    container.innerHTML += renderShows(series);
  }
}

// btn.addEventListener('click', handleSearch);
