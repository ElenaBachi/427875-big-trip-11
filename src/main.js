import EventBoardComponent from "./components/event-board.js";
import EventContainerComponent from "./components/trip-points.js";
import TripInfoComponent from "./components/trip-info.js";
import FilterComponent from "./components/filters.js";
import MenuComponent from "./components/menu.js";
import TripPointComponent from "./components/trip-point.js";
import TripPointEditComponent from "./components/trip-edit.js";
import NoEventsComponent from "./components/no-events.js";
import SortComponent from "./components/sorting.js";
import {generateTripPoints} from "./mock/trip-point.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from "./utils.js";

const TRIP_POINT_COUNT = 20;
const filters = generateFilters();
let tripPoints = generateTripPoints(TRIP_POINT_COUNT);

const tripPointList = tripPoints.sort((a, b) => a.tripDate - b.tripDate)
.reduce((accumulator, it) => {
  const time = new Intl.DateTimeFormat(`en-GB`).format(it.tripDate);

  if (!accumulator[time]) {
    accumulator[time] = [];
  }

  accumulator[time].push(it);

  return accumulator;
}, {});

const groupTripPoints = Object.keys(tripPointList)
.map((date, i) => {
  return {
    count: i + 1,
    date,
    points: tripPointList[date],
  };
});

tripPoints = groupTripPoints;

const siteHeaderBlock = document.querySelector(`.trip-main`);
const siteMainMenu = siteHeaderBlock.querySelector(`.trip-controls`);

const siteMainBlock = document.querySelector(`.page-main`);
const pageBodyContainer = siteMainBlock.querySelector(`.page-body__container`);

const tripInfo = siteMainBlock.querySelector(`.trip-events`);
tripInfo.remove();


const renderEvent = (pointListElement, tripPoint, dayCount) => {
  const replaceEventToEdit = () => {
    pointListElement.replaceChild(tripPointEditComponent.getElement(), tripPointComponent.getElement());
  };
  const replaceEditToEvent = () => {
    pointListElement.replaceChild(tripPointComponent.getElement(), tripPointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const tripPointComponent = new TripPointComponent(tripPoint, dayCount);
  const editButton = tripPointComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const tripPointEditComponent = new TripPointEditComponent(tripPoint);
  const editForm = tripPointEditComponent.getElement();
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderEventBoard = (boardComponent, events) => {
  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new EventContainerComponent().getElement(), RenderPosition.BEFOREEND);

  const tripPointContainer = boardComponent.getElement().querySelector(`.trip-days`);

  events.slice(0, TRIP_POINT_COUNT).map((it, i) => {
    return renderEvent(tripPointContainer, it.points[i], it.count);
  });

  const event = boardComponent.getElement().querySelector(`.trip-days__item `);
  const isNoEventsCreated = event === null || event === undefined;

  if (isNoEventsCreated) {
    render(boardComponent.getElement(), new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
  }
};

render(siteHeaderBlock, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(siteMainMenu, new FilterComponent(filters).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainMenu, new MenuComponent().getElement(), RenderPosition.AFTERBEGIN);

const eventBoardComponent = new EventBoardComponent();
render(pageBodyContainer, eventBoardComponent.getElement(), RenderPosition.BEFOREEND);
renderEventBoard(eventBoardComponent, tripPoints);
