const event = require("../models/event");

const getAllEvents = () => {
  return event
    .find()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

const getEventById = () => {
  return;
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
