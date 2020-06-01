import EventContainerComponent from "../components/event-container.js";
import EventListByDayComponent from "../components/event-list-by-day.js";
import EventsListComponent from "../components/events-list.js";
import NoEventsComponent from "../components/no-events.js";
import PointController, {Mode as PointControllerMode, EmptyPoint} from "./point.js";
import SortComponent, {SortType} from "../components/sorting.js";
import {render, RenderPosition} from "../utils/render.js";
import {MONTH_NAMES} from "../const.js";

const TRIP_POINT_COUNT = 20;

const groupPointsByDay = (points) => {
  const tripPointList = points.sort((a, b) => a.tripDate - b.tripDate)
  .reduce((acc, it) => {
    const time = `${MONTH_NAMES[it.timeFrom.getMonth()]} ${it.timeFrom.getDate()}`;
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(it);

    return acc;
  }, {});

  const groupedTripPoints = Object.keys(tripPointList)
  .map((date, i) => {
    return {
      count: i + 1,
      date,
      points: tripPointList[date],
    };
  });

  return groupedTripPoints;
};

const getSortedEvents = (tripPoints, sortType) => {
  let sortedEvents = [];
  const eventsToSort = tripPoints.slice();
  const defaultEvents = groupPointsByDay(tripPoints);

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
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._showedEventControllers = [];
    this._eventsCount = TRIP_POINT_COUNT;
    this._sortComponent = new SortComponent();
    this._eventContainerComponent = new EventContainerComponent();
    this._eventsListComponent = new EventsListComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._creatingEvent = null;

    this._tripPointContainer = this._eventContainerComponent.getElement();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _renderEvents(container, tripPoints) {
    const events = groupPointsByDay(tripPoints);

    events.forEach((event) => {
      const eventListByDay = new EventListByDayComponent(event.count, event.date);
      const eventsList = new EventsListComponent();
      render(container, eventListByDay, RenderPosition.BEFOREEND);
      render(eventListByDay.getElement(), eventsList, RenderPosition.BEFOREEND);

      event.points.map((point) => {
        const pointController = new PointController(eventsList.getElement(), this._onDataChange, this._onViewChange);

        pointController.render(point, PointControllerMode.DEFAULT);
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
      pointController.render(event, PointControllerMode.DEFAULT);
      this._showedEventControllers = this._showedEventControllers.concat(pointController);
    });
  }

  render() {
    const container = this._container.getElement();
    const events = this._pointsModel.getPoints();

    container.innerHTML = ``;

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._eventContainerComponent, RenderPosition.BEFOREEND);

    this._renderEvents(this._tripPointContainer, events.slice());

    const event = container.querySelector(`.trip-days__item`);
    const isNoEventsCreated = event === null || event === undefined;

    if (isNoEventsCreated) {
      render(container, this._noEventsComponent, RenderPosition.BEFOREEND);
    }
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    const eventContainerElement = this._eventContainerComponent.getElement();

    eventContainerElement.innerHTML = ``;

    this._creatingEvent = new PointController(eventContainerElement, this._onDataChange, this._onViewChange);
    this._creatingEvent.render(EmptyPoint, PointControllerMode.ADDING, RenderPosition.AFTERBEGIN);
  }

  _removeEvents() {
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this._showedEventControllers = [];
  }

  _updateEvents() {
    this._tripPointContainer.innerHTML = ``;

    const points = this._pointsModel.getPoints();

    this._removeEvents();
    this._renderEvents(this._tripPointContainer, points.slice());
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingEvent = null;

      if (newData === null) {
        pointController.destroy();
        this._updateEvents();
      } else {
        this._pointsModel.addPoints(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);

        this._showedEventControllers = [].concat(pointController, this._showedEventControllers);
        this._updateEvents();
      }

    } else if (newData === null) {
      this._pointsModel.removePoints(oldData.id);
      this._updateEvents();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
        this._updateEvents();
      }
    }
  }

  _onFilterChange() {
    this._updateEvents();
  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    const events = this._pointsModel.getPoints();
    const sortedEvents = getSortedEvents(events, sortType);

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

    this._renderEvents(this._tripPointContainer, events);
  }
}
