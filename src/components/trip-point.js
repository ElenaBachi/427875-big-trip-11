import AbstractComponent from "./abstract-component.js";
import {stopTypes} from "../const.js";
import {capitalize, formatTime, makeDatetime} from "../utils/common.js";

const createOfferMarkup = (offer) => {
  const {title, price} = offer;
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createTripPointTemplate = (tripPoint) => {
  const {tripType, tripPrice, destination, timeFrom, timeTo, duration, offers} = tripPoint;

  const isStopEvent = stopTypes.includes(tripType) ? `in` : `to`;
  const createOffersMarkup = () => offers.map(createOfferMarkup).join(``);
  const offersMarkup = offers !== null ? createOffersMarkup() : ``;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${tripType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalize(tripType)} ${isStopEvent} ${destination.city}</h3>

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
        ${offers !== null ?
        `<ul class="event__selected-offers">
          ${offersMarkup}
        </ul>` : ``}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripPoint extends AbstractComponent {
  constructor(tripPoint) {
    super();

    this._tripPoint = tripPoint;
  }

  getTemplate() {
    return createTripPointTemplate(this._tripPoint);
  }

  setEditButtonClickHandler(cb) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, cb);
  }
}
