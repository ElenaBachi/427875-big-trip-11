import {getRandomIntegerNumber, getRandomArrayElement, getRandomArrayLength, generateImgGallery, getRandomTime, getRandomDate, generateDurationTime} from "../utils/common.js";
import {OFFERS, DescriptionItems} from "../const.js";

const TripTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const Destinations = [`Amsterdam`, `Geneva`, `Charmonix`, `Saint-Petersburg`];

const price = {
  min: 0,
  max: 150,
};

const getEndTime = (time) => {
  const timeTo = new Date(time);
  timeTo.setMilliseconds(getRandomIntegerNumber(300000, 8280000));
  return timeTo;
};

const generateRandomOfferList = (offerList) => {
  const randomNum = getRandomIntegerNumber(1, 5);
  const randomOfferList = offerList.slice(0, randomNum);

  return randomOfferList;
};

const generateTripPoint = () => {
  const tripType = getRandomArrayElement(TripTypes);
  const timeFrom = getRandomTime();
  const timeTo = getEndTime(timeFrom);
  const duration = generateDurationTime(timeFrom, timeTo);
  const destination = {
    city: getRandomArrayElement(Destinations),
    description: getRandomArrayLength(DescriptionItems),
    photos: generateImgGallery(getRandomIntegerNumber(1, 10)),
  };

  return {
    tripType,
    tripPrice: getRandomIntegerNumber(price.min, price.max),
    destination,
    tripDate: getRandomDate(),
    timeFrom,
    timeTo,
    duration,
    isFavorite: Math.random() > 0.5,
    offers: generateRandomOfferList(OFFERS[tripType]),
  };
};


const generateTripPoints = (count) => {
  return new Array(count).fill(``).map(generateTripPoint);
};

export {generateTripPoint, generateTripPoints};
