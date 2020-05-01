import EventContainerComponent from "../components/events-container.js";
import EventListByDayComponent from "../components/event-list-by-day.js";
import EventsListComponent from "../components/events-list.js";
import TripPointComponent from "../components/trip-point.js";
import TripPointEditComponent from "../components/trip-edit.js";
import NoEventsComponent from "../components/no-events.js";
import SortComponent, {SortType} from "../components/sorting.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const TRIP_POINT_COUNT = 20;

const renderEvent = (pointListElement, tripPoint) => {
  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };
  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventComponent = new TripPointComponent(tripPoint);

  eventComponent.setEditButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditComponent = new TripPointEditComponent(tripPoint);

  eventEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, eventComponent, RenderPosition.BEFOREEND);
};

const renderDefaultEvents = (eventList, events) => {
  events.forEach((event, i) => {
    event.points.map((point) => {
      renderEvent(eventList[i], point);
    });
  });
};

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const defaultEvents = events.slice();
  let eventsToSort = [];
  events.slice().forEach((event) => {
    event.points.forEach((it) => {
      eventsToSort.push(it);
    });
  });

  switch (sortType) {
    case SortType.TIME:
      sortedEvents = eventsToSort.sort((a, b) => b.timeFrom - a.timeFrom);
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

    this._sortComponent = new SortComponent();
    this._eventContainerComponent = new EventContainerComponent();
    this._eventsListComponent = new EventsListComponent();
    this._noEventsComponent = new NoEventsComponent();
  }

  getEventListByDay(eventList) {
    return new EventListByDayComponent(eventList.count, eventList.date);
  }

  renderEventsByDay(tripPoints, tripPointsContainer) {
    const container = this._container.getElement();

    tripPoints.forEach((it) => {
      render(tripPointsContainer, this.getEventListByDay(it), RenderPosition.BEFOREEND);
    });

    const eventListByDay = container.querySelectorAll(`.trip-days__item`);

    eventListByDay.forEach((it) => {
      render(it, new EventsListComponent(), RenderPosition.BEFOREEND);
    });
  }

  render(events) {
    const container = this._container.getElement();
    const showingEventsCount = TRIP_POINT_COUNT;

    container.innerHTML = ``;

    events = events.slice(0, showingEventsCount);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._eventContainerComponent, RenderPosition.BEFOREEND);

    const tripPointContainer = this._eventContainerComponent.getElement();

    this.renderEventsByDay(events, tripPointContainer);

    const eventList = container.querySelectorAll(`.trip-events__list`);

    renderDefaultEvents(eventList, events);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const sortedEvents = getSortedEvents(events, sortType);

      if (sortType !== SortType.DEFAULT) {
        tripPointContainer.innerHTML = ``;

        this.renderEventsByDay(sortedEvents, tripPointContainer);

        const eventsByDay = container.querySelectorAll(`.trip-days__item`);

        eventsByDay.forEach((it) => {
          it.querySelector(`.day__counter`).classList.add(`visually-hidden`);
          it.querySelector(`.day__date`).classList.add(`visually-hidden`);
        });

        const tripEventList = container.querySelectorAll(`.trip-events__list`);

        sortedEvents.map((event, i) => {
          return renderEvent(tripEventList[i], event);
        });

        return;
      }

      tripPointContainer.innerHTML = ``;

      this.renderEventsByDay(events, tripPointContainer);

      const eventsByDay = container.querySelectorAll(`.trip-days__item`);

      eventsByDay.forEach((it) => {
        it.querySelector(`.day__counter`).classList.remove(`visually-hidden`);
        it.querySelector(`.day__date`).classList.remove(`visually-hidden`);
      });

      const eventListNew = container.querySelectorAll(`.trip-events__list`);

      renderDefaultEvents(eventListNew, events);
    });

    // Если нет точек маршрута:
    const event = container.querySelector(`.trip-days__item `);
    const isNoEventsCreated = event === null || event === undefined;

    if (isNoEventsCreated) {
      render(container, this._noEventsComponent, RenderPosition.BEFOREEND);
    }
  }
}
