import AbstractSmartComponent from "./abstract-smart-component.js";
import {OFFERS, DescriptionItems, eventTypes, stopTypes} from "../const.js";
import {formatTime, formatDate, getRandomIntegerNumber, getRandomArrayLength, generateImgGallery} from "../utils/common.js";

const createTripTypesMarkup = (tripTypes) => {
  return tripTypes
  .map((tripType, index) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${tripType.toLowerCase()}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripType.toLowerCase()}">
        <label class="event__type-label  event__type-label--${tripType.toLowerCase()}" for="event-type-${tripType.toLowerCase()}-${index}">${tripType}</label>
      </div>`
    );
  }).join(`\n`);
};

const createEventStopMarkup = (tripTypes) => {
  return tripTypes
  .map((tripType, index) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${tripType.toLowerCase()}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripType.toLowerCase()}">
        <label class="event__type-label  event__type-label--${tripType.toLowerCase()}" for="event-type-${tripType.toLowerCase()}-${index}">${tripType}</label>
    </div>`
    );
  }).join(`\n`);
};

const createOfferListMarkup = (offer) => {
  const {name, title, price, selected} = offer;
  const isOfferChecked = selected ? `checked` : ``;
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}" ${isOfferChecked}>
      <label class="event__offer-label" for="event-offer-${name}-1">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createDestinationMarkup = (destination) => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.photos}
        </div>
      </div>
    </section>`
  );
};

const createTripPointEditTemplate = (tripPoint) => {
  const {destination, tripDate, tripType, tripPrice, offers, isFavorite} = tripPoint;

  const date = formatDate(tripDate);
  const time = formatTime(tripDate);

  const isStopEvent = stopTypes.includes(tripType) ? `in` : `to`;
  const favoriteButton = isFavorite ? `checked` : ``;

  const tripTypesMarkup = createTripTypesMarkup(eventTypes);
  const eventStopMarkup = createEventStopMarkup(stopTypes);
  const offerListMarkup = offers.map(createOfferListMarkup).join(`\n`);
  const destinationMarkup = destination === `` ? `` : createDestinationMarkup(destination);
  const isOfferCreated = offerListMarkup;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${tripType.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            ${tripTypesMarkup}
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
            ${eventStopMarkup}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${tripType} ${isStopEvent}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
          <option value="Saint Petersburg"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${date} ${time}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${date} ${time}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripPrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

      <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favoriteButton}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
      ${isOfferCreated ?
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offerListMarkup}
        </div>
      </section>` : ``}
      ${destinationMarkup}
    </section>
  </form>`
  );
};

export default class TripPointEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;

    this._eventType = this._event.tripType;
    this._eventOffers = this._event.offers;

    this._destination = this._event.destination;

    this._submitHandler = null;
    this._favoriteButtonHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripPointEditTemplate(this._event);
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoritesButtonClickHandler(this._favoriteButtonHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    const event = this._event;
    this._eventType = event.tripType;
    this._eventOffers = event.offers;
    this._destination = event.destination;

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, handler);

    this._favoriteButtonHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const eventTypeList = element.querySelector(`.event__type-list`);
    const eventDestination = element.querySelector(`.event__input--destination`);

    eventTypeList.addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._eventType = evt.target.value;
      this._eventOffers = OFFERS[this._eventType];
      this.rerender();
    });

    eventDestination.addEventListener(`input`, (evt) => {
      evt.preventDefault();
      const choosedCity = evt.target.value;

      this._destination = {
        city: choosedCity,
        description: getRandomArrayLength(DescriptionItems),
        photos: generateImgGallery(getRandomIntegerNumber(1, 10)),
      };

      this.rerender();
    });
  }
}
