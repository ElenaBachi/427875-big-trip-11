import moment from "moment";

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD/MM/YYYY`);
};

const getDurationTime = (start, end) => {
  return moment.duration(end - start);
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

export const generateDurationTime = (timeFrom, timeTo) => {
  const duration = getDurationTime(timeFrom, timeTo);

  const durationDays = duration.days() ? `${duration.days()}D` : ``;
  const durationHours = duration.hours() ? `${duration.hours()}H` : ``;
  const durationMinutes = duration.minutes() ? `${duration.minutes()}M` : ``;

  return `${durationDays} ${durationHours} ${durationMinutes}`;
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
