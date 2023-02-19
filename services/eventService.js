const event = require("../models/event");

const getAllEvents = () => {
  return event.find().then((data) => {
    return data;
  });
};

const getEventById = (id) => {
  return event.findById(id).then((data) => {
    return data;
  });
};

const createNewEvent = (newEvent) => {
  return event.insertMany(newEvent).then((data) => {
    return res.send(data);
  });
};

const updateOneEvent = (id, updatedEvent) => {
  return event.findByIdAndUpdate(id, updatedEvent).then((data) => {
    return data;
  });
};

const deleteOneEvent = (id) => {
  return event.findByIdAndDelete(id).then((data) => {
    return data;
  });
};

module.exports = {
  getAllEvents,
  getEventById,
  createNewEvent,
  updateOneEvent,
  deleteOneEvent,
};
