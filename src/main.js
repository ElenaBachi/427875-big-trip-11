import {createTripInfoTemplate} from "./components/trip-info.js";
import {createFilterTemplate} from "./components/filters.js";
import {createMenuTemplate} from "./components/menu.js";
import {createTripPointTemplate} from "./components/trip-point.js";
import {createTripEditTemplate} from "./components/trip-edit.js";
import {createSortControlTemplate} from "./components/sorting.js";
import {generateTripPoints} from "./mock/trip-point.js";
import {generateFilters} from "./mock/filter.js";

const TRIP_POINT_COUNT = 20;
const SHOWING_TRIP_POINTS_ON_START = 4;
// const SHOWING_TRIP_POINTS_BY_SCROLLING = 3; ???


const render = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
render(siteMainElement, createTripInfoTemplate());

const filters = generateFilters();
const tripPoints = generateTripPoints(TRIP_POINT_COUNT);

const siteMainMenu = siteMainElement.querySelector(`.trip-controls`);
render(siteMainMenu, createFilterTemplate(filters));
render(siteMainMenu, createMenuTemplate());

const pageMain = document.querySelector(`.page-main`);
const tripInfo = pageMain.querySelector(`.trip-events`);

let showingTripPoints = SHOWING_TRIP_POINTS_ON_START;

for (let i = 1; i < showingTripPoints; i++) {
  render(tripInfo, createTripPointTemplate(tripPoints[i], i), `beforeend`);
}
render(tripInfo, createTripEditTemplate(tripPoints[0]));
render(tripInfo, createSortControlTemplate());

const destinationInfoBlock = document.querySelector(`.event__section--destination`);
destinationInfoBlock.classList.add(`visually-hidden`);

const destinationChooseInput = document.querySelector(`.event__input--destination`);
// option.value = ???
destinationChooseInput.onchange = () => {
  destinationInfoBlock.classList.remove(`visually-hidden`);
};

