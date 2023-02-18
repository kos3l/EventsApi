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

const createNewEvent = () => {
  return;
};

const updateOneEvent = () => {
  return;
};

const deleteOneEvent = () => {
  return;
};

module.exports = {
  getAllEvents,
  getEventById,
  createNewEvent,
  updateOneEvent,
  deleteOneEvent,
};
