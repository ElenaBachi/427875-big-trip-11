import {createElement, makeDatetime} from "../utils.js";
import {MONTH_NAMES} from "../const.js";

const createEventListByDayTemplate = (dayCount, date) => {

  // const date = `${MONTH_NAMES[tripPoint.tripDate.getMonth()]} ${tripPoint.tripDate.getDate()}`;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${date}">${date}</time>
      </div>
    </li>`
  );
};

export default class EventListByDay {
  constructor(tripPoint, dayCount) {
    this._tripPoint = tripPoint;
    this._dayCount = dayCount;
    this._element = null;
  }

  getTemplate() {
    return createEventListByDayTemplate(this._tripPoint, this._dayCount);
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
