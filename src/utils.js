export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

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

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + diffValue);
  targetDate.setMinutes(targetDate.getMinutes() + diffValue);
  return targetDate;
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setFullYear(2019);
  targetDate.setMonth(targetDate.getDate() + diffValue);
  targetDate.setDate(targetDate.getDate() + diffValue);
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
  const durationMinutes = Math.round(diffInMinutes - durationHours * TimeValues.MIN);

  if (durationHours === 0) {
    return `${durationMinutes}M`;
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

export const makeDatetime = (date) => {
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  return `${year}-${month}-${day}`;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
