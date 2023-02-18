const event = require("../models/event");
const eventService = require("../services/eventService");
const createNewEvent = (req, res) => {
  data = req.body;
  event
    .insertMany(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const getAllEvents = async (req, res) => {
  try {
    const allEvents = await eventService.getAllEvents();
    res.send(allEvents);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const oneEvent = await eventService.getEventById(req.params.id);
    res.send(oneEvent);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateOneEvent = (req, res) => {
  const id = req.params.id;

  event
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update event with id=" + id + ". Event was not found",
        });
      } else {
        res.send({ message: "Event was succesfully updated." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating event with id" + id });
    });
};

const deleteOneEvent = (req, res) => {
  const id = req.params.id;
  event
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete event with id=" + id + ". Event was not found",
        });
      } else {
        res.send({ message: "Event was succesfully delete." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting event with id" + id });
    });
};

module.exports = {
  createNewEvent,
  getAllEvents,
  getEventById,
  updateOneEvent,
  deleteOneEvent,
};
