"use strict";
//variables
const inputSearch = document.querySelector(".js-input");
const btn = document.querySelector(".js-btn");
const container = document.querySelector(".js-container");
const containerFav = document.querySelector(".js-containerFav");
const url = "//api.tvmaze.com/singlesearch/shows?q=girls";

//arrays vacios de las dos secciones: encontrados y favoritos
// sectionSearch = [];
// sectionFav = [];

//Pintar unas películas
fetch(url)
  .then((response) => response.json())
  .then((dataAPI) => {
    console.log(dataAPI);
    container.innerHTML += dataAPI;
  });

//funcion API
// function getInfoApi(event) {
//   event.preventDefault();
//   const name = document.querySelector(".js-input").value;
//   fetch(`http://api.tvmaze.com/search/shows?q=${name}`)
//     .then((response) => response.json())
//     .then((data) => {
//       series = data;
//       dataResult();
//     });
// }

//eventos
// btn.addEventListener("click", btnSearch);
