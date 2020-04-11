const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDate = (date) => {
  const day = castTimeFormat(date.getDay());
  const month = castTimeFormat(date.getMonth());
  const year = date.getYear() - 100;

  return `${day}/${month}/${year}`;
};

export const getRandomTime = () => {
  const hours = castTimeFormat(getRandomIntegerNumber(0, 23));
  const minutes = castTimeFormat(getRandomIntegerNumber(0, 59));

  return `${hours}:${minutes}`;
};

const getTime = (time) => {
  const timeHours = time.split(`:`)[0];
  const timeMinutes = time.split(`:`)[1];

  return new Date(0, 0, 0, timeHours, timeMinutes);
};

export const generateDurationTime = (timeFrom, timeTo) => {
  let timeDiff = getTime(timeTo) - getTime(timeFrom);
  let hours;
  let minutes;

  if (timeDiff > 0) {
    hours = Math.floor(timeDiff / 3600000) + `H`;
    minutes = Math.round(timeDiff / 60000) - parseInt(hours, 10) * 60 + `M`;
  } else {
    hours = (24 - Math.floor(timeDiff / 3600000)) + `H`;
    minutes = (60 - Math.round(timeDiff / 60000) - parseInt(hours, 10) * 60) + `M`;
  }

  let result = `${hours} ${minutes}`;
  return result;
};

export const generateImgGallery = () => {
  const MAX_IMG_COUNT = 5;
  const eventPhotos = [];

  for (let i = 0; i < MAX_IMG_COUNT; i++) {
    const imgSrc = `http://picsum.photos/248/152?r=${Math.random()}`;
    const eventPhoto = `<img class="event__photo" src="${imgSrc}" alt="Event photo">`;
    eventPhotos.push(eventPhoto);
  }
  return getRandomArrayLength(eventPhotos);
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayElement = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomArrayLength = (array) => {
  const newLength = getRandomIntegerNumber(1, array.length);
  return array.slice(0, newLength);
};
