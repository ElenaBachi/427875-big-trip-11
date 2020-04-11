import {MONTH_NAMES, stopTypes} from "../const.js";

export const createTripPointTemplate = (tripPoint, tripCount) => {
  const {tripType, tripPrice, destination, /* isFavorite */ dueDate, timeFrom, timeTo, duration} = tripPoint;

  const isStopEvent = stopTypes.includes(tripType) ? `in` : `to`;

  const date = `${MONTH_NAMES[dueDate.getMonth()]} ${dueDate.getDate()}`;
  const tripTimeFrom = timeFrom;
  const tripTimeTo = timeTo;

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${tripCount}</span>
          <time class="day__date" datetime="2019-03-18">${date}</time>
        </div>
        <ul class="trip-events__list">
          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${tripType}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${tripType} ${isStopEvent} ${destination.city}</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T10:30">${tripTimeFrom}</time>
                  &mdash;
                  <time class="event__end-time" datetime="2019-03-18T11:00">${tripTimeTo}</time>
                </p>
                <p class="event__duration">${duration}</p>
              </div>

              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${tripPrice}</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">Order uber</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">20</span>
                 </li>
              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>
        </ul>
      </li>
    </ul>`
  );
};
