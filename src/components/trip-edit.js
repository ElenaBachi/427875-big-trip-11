import {eventTypes, stopTypes, offers} from "../const.js";
import {formatTime, formatDate} from "../utils.js";

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
        <input id="event-type-${tripType}-in-${index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripType}-in">
        <label class="event__type-label  event__type-label--${tripType}-in" for="event-type-${tripType}-in-${index}">${tripType}-in</label>
      </div>`
    );
  }).join(`\n`);
};

const createOfferListMarkup = (availableOffers, checkedOffers) => {

  const isOfferChecked = Object.values(checkedOffers).some(Boolean) ? `checked` : ``;

  return availableOffers
  .map((offer, i) => {
    const offerName = availableOffers[i].name;
    const offerTitle = availableOffers[i].title;
    const offerPrice = availableOffers[i].price;
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerName}-${i}" type="checkbox" name="event-offer-${offerName}" ${isOfferChecked}>
        <label class="event__offer-label" for="event-offer-${offerName}-1">
          <span class="event__offer-title">${offerTitle}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

export const createTripEditTemplate = (tripPoint) => {
  const {destination, dueDate, tripType, checkedOffers} = tripPoint;

  const date = formatDate(dueDate);
  const time = formatTime(dueDate);

  const isStopEvent = stopTypes.includes(tripType) ? `in` : `to`;

  const tripTypesMarkup = createTripTypesMarkup(eventTypes);
  const eventStopMarkup = createEventStopMarkup(stopTypes);
  const offerListMarkup = createOfferListMarkup(offers, checkedOffers);

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
            ${tripType} ${isStopEvent}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
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
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offerListMarkup}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.photos}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};