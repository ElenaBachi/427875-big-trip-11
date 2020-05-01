import EventContainerComponent from "../components/events-container.js";
import EventListByDayComponent from "../components/event-list-by-day.js";
import EventsListComponent from "../components/events-list.js";
import TripPointComponent from "../components/trip-point.js";
import TripPointEditComponent from "../components/trip-edit.js";
import NoEventsComponent from "../components/no-events.js";
import SortComponent from "../components/sorting.js";
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

export default class EventBoardController {
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

  render(events) {
    const container = this._container.getElement();

    events = events.slice(0, TRIP_POINT_COUNT);
    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._eventContainerComponent, RenderPosition.BEFOREEND);

    const tripPointContainer = container.querySelector(`.trip-days`);

    events.forEach((it) => {
      render(tripPointContainer, this.getEventListByDay(it), RenderPosition.BEFOREEND);
    });

    const eventListByDay = container.querySelectorAll(`.day`);

    eventListByDay.forEach((it) => {
      render(it, new EventsListComponent(), RenderPosition.BEFOREEND);
    });

    const eventList = container.querySelectorAll(`.trip-events__list`);

    events.forEach((event, i) => {
      event.points.map((point) => {
        renderEvent(eventList[i], point);
      });
    });

    // Если нет точек маршрута:
    const event = container.querySelector(`.trip-days__item `);
    const isNoEventsCreated = event === null || event === undefined;

    if (isNoEventsCreated) {
      render(container, this._noEventsComponent, RenderPosition.BEFOREEND);
    }
  }
}
