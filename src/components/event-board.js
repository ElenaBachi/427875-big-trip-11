import AbstractComponent from "./abstract-component.js";

const createEventBoardTemplate = () => {
  return (
    `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
    </section>`
  );
};

export default class EventBoard extends AbstractComponent {
  getTemplate() {
    return createEventBoardTemplate();
  }
}
