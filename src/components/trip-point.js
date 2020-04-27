import {stopTypes} from "../const.js";
import {createElement, generateDurationTime, formatTime, makeDatetime} from "../utils.js";

const createTripPointTemplate = (tripPoint) => {
  const {tripType, tripPrice, destination, timeFrom, timeTo, offer} = tripPoint;

  const isStopEvent = stopTypes.includes(tripType) ? `in` : `to`;

  const duration = generateDurationTime(timeFrom, timeTo);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${tripType.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${tripType} ${isStopEvent} ${destination.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${makeDatetime(timeFrom)}T10:30">${formatTime(timeFrom)}</time>
              &mdash;
            <time class="event__end-time" datetime="${makeDatetime(timeTo)}T11:00">${formatTime(timeTo)}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${tripPrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripPoint {
  constructor(tripPoint) {
    this._tripPoint = tripPoint;
    this._element = null;
  }

  getTemplate() {
    return createTripPointTemplate(this._tripPoint);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
