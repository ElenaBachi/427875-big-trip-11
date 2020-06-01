export const eventTypes = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const stopTypes = [`check-in`, `sightseeing`, `restaurant`];

export const MONTH_NAMES = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUNE`,
  `JULY`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const OFFERS = {
  'taxi': [{
    name: `uber`,
    title: `Order Uber`,
    price: 20,
    selected: Math.random() > 0.5,
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    selected: Math.random() > 0.5,
  }],

  'bus': [{
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    selected: Math.random() > 0.5,
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5,
    selected: Math.random() > 0.5,
  }],

  'train': [{
    name: `train`,
    title: `Travel by train`,
    price: 40,
    selected: Math.random() > 0.5,
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    selected: Math.random() > 0.5,
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15,
    selected: Math.random() > 0.5,
  }],

  'ship': [{
    name: `seats`,
    title: `Choose seats`,
    price: 5,
    selected: Math.random() > 0.5,
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    selected: Math.random() > 0.5,
  }, {
    name: `meal`,
    title: `Add meal`,
    price: 15,
    selected: Math.random() > 0.5,
  }],

  'transport': [{
    name: `uber`,
    title: `Order Uber`,
    price: 20,
    selected: Math.random() > 0.5,
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    selected: Math.random() > 0.5,
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5,
    selected: Math.random() > 0.5,
  }],

  'drive': [{
    name: `car`,
    title: `Rent a car`,
    price: 200,
    selected: Math.random() > 0.5,
  }],

  'flight': [{
    name: `tickets`,
    title: `Book tickets`,
    price: 40,
    selected: Math.random() > 0.5,
  }, {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 100,
    selected: Math.random() > 0.5,
  }, {
    name: `luggage`,
    title: `Add luggage`,
    price: 30,
    selected: Math.random() > 0.5,
  }],

  'check-in': [{
    name: `luggage`,
    title: `Add luggage`,
    price: 30,
    selected: Math.random() > 0.5,
  }, {
    name: `uber`,
    title: `Order Uber`,
    price: 20,
    selected: Math.random() > 0.5,
  }],

  'sightseeing': [{
    name: `tickets`,
    title: `Book tickets`,
    price: 40,
    selected: Math.random() > 0.5,
  }, {
    name: `car`,
    title: `Rent a car`,
    price: 200,
    selected: Math.random() > 0.5,
  }],

  'restaurant': [{
    name: `meal`,
    title: `Add meal`,
    price: 15,
    selected: Math.random() > 0.5,
  }, {
    name: `seats`,
    title: `Choose seats`,
    price: 5,
    selected: Math.random() > 0.5,
  }],
};

export const DescriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];
