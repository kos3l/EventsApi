const event = require("../models/event");

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

const getAllEvents = (req, res) => {
  event
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const getEventById = (req, res) => {
  event
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
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
