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

const renderEventBoard = (boardComponent, events) => {
  events = events.slice(0, TRIP_POINT_COUNT);
  render(boardComponent.getElement(), new SortComponent(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), new EventContainerComponent(), RenderPosition.BEFOREEND);

  const tripPointContainer = boardComponent.getElement().querySelector(`.trip-days`);

  events.forEach((it) => {
    render(tripPointContainer, new EventListByDayComponent(it.count, it.date), RenderPosition.BEFOREEND);
  });

  const eventListByDay = boardComponent.getElement().querySelectorAll(`.day`);

  eventListByDay.forEach((it) => {
    render(it, new EventsListComponent(), RenderPosition.BEFOREEND);
  });

  const eventList = document.querySelectorAll(`.trip-events__list`);

  events.forEach((event, i) => {
    event.points.map((point) => {
      renderEvent(eventList[i], point);
    });
  });

  // Если нет точек маршрута:
  const event = boardComponent.getElement().querySelector(`.trip-days__item `);
  const isNoEventsCreated = event === null || event === undefined;

  if (isNoEventsCreated) {
    render(boardComponent.getElement(), new NoEventsComponent(), RenderPosition.BEFOREEND);
  }
};

export default class EventBoardController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._eventContainerComponent = new EventContainerComponent();
    this._eventListByDayComponent = new EventListByDayComponent();
    this._eventsListComponent = new EventsListComponent();
    this._noEventsComponent = new NoEventsComponent();
  }

  render(events) {
    renderEventBoard(this._container, events);
  }
}
