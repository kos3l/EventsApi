const event = require("../models/event");

const getAllEvents = async () => {
  const allEvents = await event.find().then((data) => {
    return data;
  });
  return allEvents;
};

const getEventById = async (id) => {
  const event = await event.findById(id).then((data) => {
    return data;
  });
  return event;
};

const createNewEvent = async (newEvent) => {
  const createdEvent = await event.insertMany(newEvent).then((data) => {
    return res.send(data);
  });
  return createdEvent;
};

const updateOneEvent = async (id, updatedEvent) => {
  const event = await event.findByIdAndUpdate(id, updatedEvent).then((data) => {
    return data;
  });
  return event;
};

const deleteOneEvent = async (id) => {
  const deletedEvent = event.findByIdAndDelete(id).then((data) => {
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
