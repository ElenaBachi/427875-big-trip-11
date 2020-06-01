import AbstractComponent from "./abstract-component.js";

export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`,
};

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" id="table">Table</a>
      <a class="trip-tabs__btn" href="#" id="stats">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setActiveItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}`);
    const CLASS_ACTIVE = `trip-tabs__btn--active`;

    if (item) {
      item.classList.add(CLASS_ACTIVE);
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
