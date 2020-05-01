import AbstractComponent from "./abstract-component.js";

const createEventListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class EventsList extends AbstractComponent {
  getTemplate() {
    return createEventListTemplate();
  }
}
