import {createTripInfo} from "./components/trip-info.js";
import {createFilterTemplate} from "./components/filters.js";
import {createMenuTemplate} from "./components/menu.js";
import {createTripPointTemplate} from "./components/trip-point.js";
import {createTripEditTemplate} from "./components/trip-edit.js";
import {createSortControlTemplate} from "./components/sorting.js";

const TRIP_POINT_COUNT = 3;

const render = (container, template, place = `afterbegin`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
render(siteMainElement, createTripInfo());

const siteMainMenu = siteMainElement.querySelector(`.trip-controls`);
render(siteMainMenu, createFilterTemplate());
render(siteMainMenu, createMenuTemplate());

const pageMain = document.querySelector(`.page-main`);
const tripInfo = pageMain.querySelector(`.trip-events`);

for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  render(tripInfo, createTripPointTemplate());
}
render(tripInfo, createTripEditTemplate());
render(tripInfo, createSortControlTemplate());
