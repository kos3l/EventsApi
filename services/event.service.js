const Event = require("../models/event");
const DateHelper = require("../utils/helpers/Date.helper");

const createNewEvent = async (newEvent, userId) => {
  let eventData = {
    ...newEvent,
    createdBy: userId,
  };
  const createdEvent = await Event.create(eventData).then((data) => {
    return data;
  });
  return createdEvent;
};

const getAllEvents = async (userId, isArchived) => {
  const findArgs =
    isArchived != undefined && isArchived != null
      ? {
          createdBy: userId,
          isArchived: isArchived,
        }
      : {
          createdBy: userId,
        };

  const allEvents = await Event.find(findArgs).then((data) => {
    return data;
  });
  return allEvents;
};

const getAllEventsByDate = async (userId, date, datePrecision) => {
  let findArgs = null;

  // test more once in typescript, what will happen if someone inputs anything else from month/week/year
  findArgs = {
    createdBy: userId,
    startDate: !datePrecision
      ? {
          $gte: DateHelper.calculateStartOfPeriod(date, "month"),
          $lte: DateHelper.calculateEndOfPeriod(date, "month"),
        }
      : {
          $gte: DateHelper.calculateStartOfPeriod(date, datePrecision),
          $lte: DateHelper.calculateEndOfPeriod(date, datePrecision),
        },
  };

  const allEvents = await Event.find(findArgs).then((data) => {
    return data;
  });
  return allEvents;
};

const getEventById = async (id) => {
  const event = await Event.findById(id).then((data) => {
    return data;
  });
  return event;
};

const updateOneEvent = async (id, updatedEvent) => {
  const event = await Event.findByIdAndUpdate(id, updatedEvent).then((data) => {
    return data;
  });
  return event;
};

const deleteOneEvent = async (id) => {
  const deletedEvent = Event.findByIdAndDelete(id).then((data) => {
    return data;
  });
  return deletedEvent;
};

module.exports = {
  getAllEvents,
  getAllEventsByDate,
  getEventById,
  createNewEvent,
  updateOneEvent,
  deleteOneEvent,
};
