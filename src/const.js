export const eventTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
export const stopTypes = [`Check-in`, `Sightseeing`, `Restaurant`];

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

export const OFFERS = {
  'Taxi': [{
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

  'Bus': [{
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

  'Train': [{
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

  'Ship': [{
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

  'Transport': [{
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

  'Drive': [{
    name: `car`,
    title: `Rent a car`,
    price: 200,
    selected: Math.random() > 0.5,
  }],

  'Flight': [{
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

  'Check-in': [{
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

  'Sightseeing': [{
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

  'Restaurant': [{
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
