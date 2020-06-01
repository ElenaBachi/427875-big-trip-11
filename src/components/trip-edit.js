import AbstractSmartComponent from "./abstract-smart-component.js";
import {OFFERS, DescriptionItems, eventTypes, stopTypes} from "../const.js";
import {capitalize, formatTime, formatDate, getRandomIntegerNumber, getRandomArrayLength, generateImgGallery, generateDurationTime} from "../utils/common.js";
import {EmptyPoint} from "../controllers/point.js";

import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const createTripTypesMarkup = (tripTypes) => {
  return tripTypes
  .map((tripType, index) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${tripType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripType}">
        <label class="event__type-label  event__type-label--${tripType}" for="event-type-${tripType}-${index}">${tripType}</label>
      </div>`
    );
  }).join(`\n`);
};

const createEventStopMarkup = (tripTypes) => {
  return tripTypes
  .map((tripType, index) => {
    return (
      `<div class="event__type-item">
        <input id="event-type-${tripType}-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripType}">
        <label class="event__type-label  event__type-label--${tripType}" for="event-type-${tripType}-${index}">${tripType}</label>
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
  const {destination, timeFrom, timeTo, tripType, tripPrice, offers, isFavorite} = tripPoint;

  const isStopEvent = stopTypes.includes(tripType) ? `in` : `to`;
  const favoriteButton = isFavorite ? `checked` : ``;

  const tripTypesMarkup = createTripTypesMarkup(eventTypes);
  const eventStopMarkup = createEventStopMarkup(stopTypes);
  const offerListMarkup = offers !== null ? offers.map(createOfferListMarkup).join(`\n`) : ``;
  const destinationMarkup = destination === `` ? `` : createDestinationMarkup(destination);

  let newPoint = false;

  if (tripPoint === EmptyPoint) {
    newPoint = true;
  }

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${tripType}.png" alt="Event type icon">
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
        ${capitalize(tripType)} ${isStopEvent}
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
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom} ${formatTime(timeFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(timeTo)} ${formatTime(timeTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripPrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${newPoint ? `Cancel` : `Delete`}</button>

      <input id="event-favorite-1" class="event__favorite-checkbox visually-hidden" type="checkbox" name="event-favorite" ${favoriteButton}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>

      ${newPoint ? `` :
      `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`}
    </header>

    <section class="event__details">
      ${offers === null ? `` :
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offerListMarkup}
        </div>
      </section>`}
      ${destination.description === undefined ? `` : destinationMarkup}
    </section>
  </form>`
  );
};

const parseFormData = (formData, form) => {
  const tripType = formData.get(`event-type`);
  const timeFrom = formData.get(`event-start-time`);
  const timeTo = formData.get(`event-end-time`);
  const duration = generateDurationTime(timeFrom, timeTo);
  const destination = {
    city: formData.get(`event-destination`),
    description: document.querySelector(`.event__destination-description`).textContent,
    photos: document.querySelectorAll(`.event__photo`),
  };
  let offers = Array.from(form.querySelectorAll(`.event__offer-selector`));
  offers.map((offer) => {
    return {
      name: offer.querySelector(`[name="event-offer-${name}"]`),
      title: offer.querySelector(`.event__offer-title`).textContent,
      price: offer.querySelector(`.event__offer-price`).textContent,
    };
  });

  return {
    tripType,
    timeFrom,
    timeTo,
    duration,
    destination,
    offers,
    tripPrice: formData.get(`event-price`),
    isFavorite: formData.get(`event-favorite`),
  };
};

export default class TripPointEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;

    this._eventType = this._event.tripType;
    this._eventOffers = this._event.offers;

    this._destination = this._event.destination;

    this._flatpickrFrom = null;
    this._flatpickrTo = null;
    this._submitHandler = null;
    this._favoriteButtonHandler = null;
    this._deleteButtonClickHandler = null;
    this._addDataClickHandler = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTripPointEditTemplate(this._event);
  }

  removeElement() {
    if (this._flatpickrFrom || this._flatpickrTo) {
      this._flatpickrFrom.destroy();
      this._flatpickrTo.destroy();
      this._flatpickrFrom = null;
      this._flatpickrTo = null;
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setAddDataClickHandler(this._addDataClickHandler);
    this.setFavoritesButtonClickHandler(this._favoriteButtonHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const event = this._event;
    this._eventType = event.tripType;
    this._eventOffers = event.offers;
    this._destination = event.destination;

    this.rerender();
  }

  _applyFlatpickr() {
    const dateStartElement = this.getElement().querySelector(`#event-start-time-1`);
    const dateEndElement = this.getElement().querySelector(`#event-end-time-1`);

    if (this._flatpickrFrom || this._flatpickrTo) {
      this._flatpickrFrom.destroy();
      this._flatpickrTo.destroy();
      this._flatpickrFrom = null;
      this._flatpickrTo = null;
    }

    this._flatpickrFrom = flatpickr(dateStartElement, {
      enableTime: true,
      altInput: true,
      allowInput: true,
      dateFormat: `DD/MM/YYY hh:mm`,
    });

    this._flatpickrTo = flatpickr(dateEndElement, {
      enableTime: true,
      altInput: true,
      allowInput: true,
      dateFormat: `DD/MM/YYY hh:mm`,
    });
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData, form);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  setAddDataClickHandler(handler) {
    const openEventBtn = this.getElement().querySelector(`.event__rollup-btn`);

    if (!openEventBtn) {
      return;
    }

    openEventBtn.addEventListener(`click`, handler);
    this._addDataClickHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
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
      const targetValue = evt.target.value;
      this._eventType = targetValue;
      this._eventOffers = OFFERS[targetValue];
      this.rerender();
    });

    eventDestination.addEventListener(`change`, (evt) => {
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
