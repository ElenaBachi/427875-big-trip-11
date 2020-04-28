import AbstractComponent from "./abstract-component.js";

const createEventsContainerTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class EventsContainer extends AbstractComponent {
  getTemplate() {
    return createEventsContainerTemplate();
  }
}
