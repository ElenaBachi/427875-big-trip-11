import EventBoardComponent from "./components/event-board.js";
import TripController, {tripPoints} from "./controllers/trip.js";
import TripInfoComponent from "./components/trip-info.js";
import FilterComponent from "./components/filters.js";
import MenuComponent from "./components/menu.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import {MONTH_NAMES} from "./const.js";

const filters = generateFilters();

// Создает объект, где ключ - дата, значение - массив с точками подходящей даты
const tripPointList = tripPoints.sort((a, b) => a.tripDate - b.tripDate)
.reduce((acc, it) => {
  const time = `${MONTH_NAMES[it.timeFrom.getMonth()]} ${it.timeFrom.getDate()}`;
  if (!acc[time]) {
    acc[time] = [];
  }
  acc[time].push(it);

  return acc;
}, {});

// Создает массив, где каждый элемент - объект, ключи: порядковый номер, дата, точки маршрута
const groupTripPoints = Object.keys(tripPointList)
.map((date, i) => {
  return {
    count: i + 1,
    date,
    points: tripPointList[date],
  };
});

const siteHeaderBlock = document.querySelector(`.trip-main`);
const siteMainMenu = siteHeaderBlock.querySelector(`.trip-controls`);

const siteMainBlock = document.querySelector(`.page-main`);
const pageBodyContainer = siteMainBlock.querySelector(`.page-body__container`);

const tripInfo = siteMainBlock.querySelector(`.trip-events`);
tripInfo.remove();

render(siteHeaderBlock, new TripInfoComponent(), RenderPosition.AFTERBEGIN);
render(siteMainMenu, new FilterComponent(filters), RenderPosition.AFTERBEGIN);
render(siteMainMenu, new MenuComponent(), RenderPosition.AFTERBEGIN);

const eventBoardComponent = new EventBoardComponent();
const eventBoardController = new TripController(eventBoardComponent);
render(pageBodyContainer, eventBoardComponent, RenderPosition.BEFOREEND);
eventBoardController.render(groupTripPoints);
