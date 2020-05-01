import AbstractComponent from "./abstract-component.js";

const createEventListByDayTemplate = (dayCount, date) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${date}">${date}</time>
      </div>
    </li>`
  );
};

export default class EventListByDay extends AbstractComponent {
  constructor(tripPoint, dayCount) {
    super();

    this._tripPoint = tripPoint;
    this._dayCount = dayCount;
  }

  getTemplate() {
    return createEventListByDayTemplate(this._tripPoint, this._dayCount);
  }
}
