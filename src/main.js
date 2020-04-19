import EventBoardComponent from "./components/event-board.js";
import EventContainerComponent from "./components/trip-points.js";
import TripInfoComponent from "./components/trip-info.js";
import FilterComponent from "./components/filters.js";
import MenuComponent from "./components/menu.js";
import TripPointComponent from "./components/trip-point.js";
import TripPointEditComponent from "./components/trip-edit.js";
import SortComponent from "./components/sorting.js";
import {generateTripPoints} from "./mock/trip-point.js";
import {generateFilters} from "./mock/filter.js";
import {render, RenderPosition} from "./utils.js";

const TRIP_POINT_COUNT = 21;
const filters = generateFilters();
const tripPoints = generateTripPoints(TRIP_POINT_COUNT);

const siteHeaderBlock = document.querySelector(`.trip-main`);
const siteMainMenu = siteHeaderBlock.querySelector(`.trip-controls`);

const siteMainBlock = document.querySelector(`.page-main`);
const pageBodyContainer = siteMainBlock.querySelector(`.page-body__container`);

const tripInfo = siteMainBlock.querySelector(`.trip-events`);
tripInfo.remove();


const renderEvent = (pointListElement, tripPoint) => {
  const onEditButtonClick = () => {
    pointListElement.replaceChild(tripPointEditComponent.getElement(), tripPointComponent.getElement());
  };
  const onEditFormSubmit = () => {
    pointListElement.replaceChild(tripPointComponent.getElement(), tripPointEditComponent.getElement());
  };

  const tripPointComponent = new TripPointComponent(tripPoint);
  const editButton = tripPointComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const tripPointEditComponent = new TripPointEditComponent(tripPoint);
  const editFormButton = tripPointEditComponent.getElement().querySelector(`form`);
  editFormButton.addEventListener(`sumbit`, onEditFormSubmit);

  render(pointListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderEventBoard = (boardComponent, events) => {
  render(boardComponent.getElement(), new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new EventContainerComponent().getElement(), RenderPosition.BEFOREEND);

  const tripPointContainer = boardComponent.getElement().querySelector(`.trip-days`);

  events.slice(0, TRIP_POINT_COUNT).forEach((event) => {
    renderEvent(tripPointContainer, event);
  });
};

render(siteHeaderBlock, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
render(siteMainMenu, new FilterComponent(filters).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainMenu, new MenuComponent().getElement(), RenderPosition.AFTERBEGIN);

const eventBoardComponent = new EventBoardComponent();
render(pageBodyContainer, eventBoardComponent.getElement(), RenderPosition.BEFOREEND);
renderEventBoard(eventBoardComponent, tripPoints);

const destinationInfoBlock = eventBoardComponent.querySelector(`.event__section--destination`);
destinationInfoBlock.classList.add(`visually-hidden`);

const destinationChooseInput = eventBoardComponent.querySelector(`.event__input--destination`);
// option.value = ???
destinationChooseInput.onchange = () => {
  destinationInfoBlock.classList.remove(`visually-hidden`);
};

