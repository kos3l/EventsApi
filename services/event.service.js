const Event = require("../models/event");

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

const getAllEvents = async () => {
  const allEvents = await Event.find().then((data) => {
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
  getEventById,
  createNewEvent,
  updateOneEvent,
  deleteOneEvent,
};
