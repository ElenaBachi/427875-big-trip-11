import {getRandomIntegerNumber, getRandomArrayElement, getRandomArrayLength, generateImgGallery, getRandomTime, generateDurationTime} from "../utils.js";

const TripTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const Destinations = [`Amsterdam`, `Geneva`, `Charmonix`, `Saint-Petersburg`];

const DescriptionItems = [
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

const DefaultOffers = {
  "luggage": false,
  "comfort": false,
  "meal": false,
  "seats": false,
  "train": false,
};

const price = {
  min: 0,
  max: 150,
};

const generateTripPoint = () => {
  return {
    tripType: getRandomArrayElement(TripTypes),
    tripPrice: getRandomIntegerNumber(price.min, price.max),
    destination: {
      city: getRandomArrayElement(Destinations),
      description: getRandomArrayLength(DescriptionItems),
      photos: generateImgGallery(),
    },
    dueDate: new Date(),
    timeFrom: getRandomTime(),
    timeTo: getRandomTime(),
    duration: generateDurationTime(`timeFrom`, `timeTo`),
    isFavorite: Math.random() > 0.5,
    checkedOffers: Object.assign({}, DefaultOffers, {"luggage": Math.random() > 0.5}, {"comfort": Math.random() > 0.5}),
  };
};

const generateTripPoints = (count) => {
  return new Array(count).fill(``).map(generateTripPoint);
};

export {generateTripPoint, generateTripPoints};
