import EventBoardComponent from "./components/event-board.js";
import TripController from "./controllers/trip.js";
import TripInfoComponent from "./components/trip-info.js";
import FilterController from "./controllers/filter.js";
import MenuComponent, {MenuItem} from "./components/menu.js";
import PointsModel from "./models/points.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateTripPoints} from "./mock/trip-point.js";

const TRIP_POINT_COUNT = 20;
const siteHeaderBlock = document.querySelector(`.trip-main`);
const siteMainMenu = siteHeaderBlock.querySelector(`.trip-controls`);
const siteMainBlock = document.querySelector(`.page-main`);
const pageBodyContainer = siteMainBlock.querySelector(`.page-body__container`);
const tripInfo = siteMainBlock.querySelector(`.trip-events`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

const tripPoints = generateTripPoints(TRIP_POINT_COUNT);
const pointsModel = new PointsModel();
pointsModel.setPoints(tripPoints);

const menuComponent = new MenuComponent();
const tripInfoComponent = new TripInfoComponent();
const eventBoardComponent = new EventBoardComponent();

const filterController = new FilterController(siteMainMenu, pointsModel);
const tripController = new TripController(eventBoardComponent, pointsModel);

tripInfo.remove();
render(siteHeaderBlock, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(siteMainMenu, menuComponent, RenderPosition.AFTERBEGIN);

filterController.render();

render(pageBodyContainer, eventBoardComponent, RenderPosition.BEFOREEND);

tripController.render();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      menuComponent.setActiveItem(MenuItem.TABLE);
      tripController.createEvent();
      break;
    case MenuItem.STATS:
      menuComponent.setActiveItem(MenuItem.STATS);
  }
});

newEventBtn.addEventListener(`click`, () => {
  // document.querySelector(`.trip-events`).innerHTML = ``;

  // render(pageBodyContainer, eventBoardComponent, RenderPosition.BEFOREEND);

  tripController.createEvent();

  newEventBtn.setAttribute(`disabled`, `disabled`);
});
