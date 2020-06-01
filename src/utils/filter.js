import {FilterType} from "../const.js";

const currentDate = Date.now();

export const getAllEvents = (events) => events;

export const getFutureEvents = (events) => {
  return events.filter((event) => event.timeFrom > currentDate);
};

export const getPastEvents = (events) => {
  return events.filter((event) => event.timeTo < currentDate);
};

export const getEventsByFilter = (events, filterType) => {
  switch (filterType) {
    case FilterType.EVERYTHING:
      return getAllEvents(events);
    case FilterType.FUTURE:
      return getFutureEvents(events);
    case FilterType.PAST:
      return getPastEvents(events);
  }

  return events;
};
