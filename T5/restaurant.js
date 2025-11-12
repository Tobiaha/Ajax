'use strict';

import {restaurantModal, restaurantRow} from './components.js';
import fetchData from './utils/fetchData.js';
import {apiURL} from './utils/variables.js';

// your code here

const modal = document.querySelector('#restaurantModal');
const modalContent = document.querySelector('#modal-content');
const closeButtons = document.querySelectorAll('.close-button');
const resetButton = document.querySelector('#reset');
const sodexoButton = document.querySelector('#sodexo');
const compassButton = document.querySelector('#compass');
const target = document.querySelector('#target');

const highlight = (evt) => {
  document.querySelector('.highlight')?.classList.remove('highlight');
  evt.currentTarget.classList.add('highlight');
};

const openModal = (restaurant, dailyMenu) => {
  modal.showModal();
  modalContent.innerHTML = '';
  const html = restaurantModal(restaurant, dailyMenu);
  modalContent.insertAdjacentHTML('beforeend', html);
};

// Sulje modaalin, kun käyttäjä klikkaa sulje-nappia
for (const closeButton of closeButtons) {
  closeButton.addEventListener('click', (evt) => {
    evt.currentTarget.parentElement.parentElement.close();
  });
}

const haeRavintolat = async () => {
  try {
    return await fetchData(`${apiURL}/restaurants`);
  } catch (err) {
    console.error('Failed to fetch restaurants', err);
    return [];
  }
};

const teeRavintolaLista = async (restaurants) => {
  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  target.innerHTML = '';

  restaurants.forEach((restaurant) => {
    const rivi = restaurantRow(restaurant);
    rivi.addEventListener('click', highlight);
    rivi.addEventListener('click', async () => {
      try {
        const dailyMenu = await fetchData(
          `${apiURL}/restaurants/${restaurant.id}/fi`
        );
        openModal(restaurant, dailyMenu);
      } catch (err) {
        console.error('Failed to fetch daily menu for', restaurant.id, err);
        // Open modal without daily menu so user still sees restaurant info
        openModal(restaurant, null);
      }
    });
    target.appendChild(rivi);
  });
};
const restaurants = await haeRavintolat();
teeRavintolaLista(restaurants);

sodexoButton.addEventListener('click', () => {
  const filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.company === 'Sodexo'
  );
  teeRavintolaLista(filteredRestaurants);
});

compassButton.addEventListener('click', () => {
  const filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.company === 'Compass Group'
  );
  teeRavintolaLista(filteredRestaurants);
});

resetButton.addEventListener('click', () => {
  teeRavintolaLista(restaurants);
});
