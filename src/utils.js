export const getRandomIntegerNumber = (min, max) => {
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
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setHours(targetDate.getHours() + diffValue);
  targetDate.setMinutes(targetDate.getMinutes() + diffValue);
  return targetDate;
};

export const generateDurationTime = (timeFrom, timeTo) => {
  const TimeValues = {
    MILLISEC: 1000,
    MIN: 60,
    HOURS: 60,
  };

  const start = new Date(timeFrom);
  const end = new Date(timeTo);
  const diffInMinutes = (end - start) / (TimeValues.MILLISEC * TimeValues.MIN);
  const durationHours = Math.floor(diffInMinutes / TimeValues.HOURS);
  const durationMinutes = diffInMinutes - durationHours * TimeValues.MIN;

  if (diffInMinutes === 0) {
    return `1D`;
  }

  if (durationMinutes === 0) {
    return `${durationHours}H`;
  } else {
    return `${durationHours}H ${durationMinutes}M `;
  }
};

export const generateImgGallery = (count) => {
  const imgSrcArray = new Array(count). fill(``).map(() => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });

  return new Array(count).fill().map((it, i) => {
    return `<img class="event__photo" src="${imgSrcArray[i]}" alt="Event photo">`;
  });
};
