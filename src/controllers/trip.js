import EventContainerComponent from "../components/events-container.js";
import EventListByDayComponent from "../components/event-list-by-day.js";
import EventsListComponent from "../components/events-list.js";
import NoEventsComponent from "../components/no-events.js";
import PointController from "./point.js";
import SortComponent, {SortType} from "../components/sorting.js";
import {render, RenderPosition} from "../utils/render.js";
import {generateTripPoints} from "../mock/trip-point.js";

const TRIP_POINT_COUNT = 20;
export const tripPoints = generateTripPoints(TRIP_POINT_COUNT);

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const eventsToSort = tripPoints.slice();
  const defaultEvents = events.slice();

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = eventsToSort.sort((a, b) => (b.timeTo - b.timeFrom) - (a.timeTo - a.timeFrom));
      break;
    case SortType.PRICE:
      sortedEvents = eventsToSort.sort((a, b) => b.tripPrice - a.tripPrice);
      break;
    case SortType.DEFAULT:
      sortedEvents = defaultEvents;
      break;
  }
  return sortedEvents;
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._events = [];
    this._showedEventControllers = [];
    this._eventsCount = TRIP_POINT_COUNT;
    this._sortComponent = new SortComponent();
    this._eventContainerComponent = new EventContainerComponent();
    this._eventsListComponent = new EventsListComponent();
    this._noEventsComponent = new NoEventsComponent();

    this._tripPointContainer = this._eventContainerComponent.getElement();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderEvents(container, events) {
    events.forEach((event) => {
      const eventListByDay = new EventListByDayComponent(event.count, event.date);
      const eventsList = new EventsListComponent();
      render(container, eventListByDay, RenderPosition.BEFOREEND);
      render(eventListByDay.getElement(), eventsList, RenderPosition.BEFOREEND);

      const pointController = new PointController(eventsList.getElement(), this._onDataChange, this._onViewChange);

      event.points.map((point) => {
        pointController.render(point);
        this._showedEventControllers = this._showedEventControllers.concat(pointController);
      });
    });
  }

  _renderSortedEvents(container, sortedEvents) {
    sortedEvents.forEach((event) => {
      const eventListByDay = new EventListByDayComponent(event.count, event.date);
      const eventsList = new EventsListComponent();
      render(container, eventListByDay, RenderPosition.BEFOREEND);
      render(eventListByDay.getElement(), eventsList, RenderPosition.BEFOREEND);

      const pointController = new PointController(eventsList.getElement(), this._onDataChange, this._onViewChange);
      pointController.render(event);
      this._showedEventControllers = this._showedEventControllers.concat(pointController);
    });
  }

  render(events) {
    events = events.slice(0, this._eventsCount);
    this._events = events;

    const container = this._container.getElement();

    container.innerHTML = ``;

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._eventContainerComponent, RenderPosition.BEFOREEND);

    this._renderEvents(this._tripPointContainer, this._events);

    const event = container.querySelector(`.trip-days__item`);
    const isNoEventsCreated = event === null || event === undefined;

    if (isNoEventsCreated) {
      render(container, this._noEventsComponent, RenderPosition.BEFOREEND);
    }
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const sortedEvents = getSortedEvents(this._events, sortType);

    if (sortType !== SortType.DEFAULT) {
      this._tripPointContainer.innerHTML = ``;

      this._renderSortedEvents(this._tripPointContainer, sortedEvents);

      const eventsByDay = this._tripPointContainer.querySelectorAll(`.trip-days__item`);

      eventsByDay.forEach((it) => {
        it.querySelector(`.day__counter`).classList.add(`visually-hidden`);
        it.querySelector(`.day__date`).classList.add(`visually-hidden`);
      });

      return;
    }

    this._tripPointContainer.innerHTML = ``;

    const eventsByDay = this._tripPointContainer.querySelectorAll(`.trip-days__item`);

    eventsByDay.forEach((it) => {
      it.querySelector(`.day__counter`).classList.remove(`visually-hidden`);
      it.querySelector(`.day__date`).classList.remove(`visually-hidden`);
    });

    this._renderEvents(this._tripPointContainer, this._events);
  }
}
