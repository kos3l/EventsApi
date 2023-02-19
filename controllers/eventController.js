const eventService = require("../services/eventService");

const createNewEvent = async (req, res) => {
  const data = req.body;
  try {
    const newEvent = await eventService.createNewEvent(data);
    res.send(newEvent);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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

const updateOneEvent = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedEvent = await eventService.updateOneEvent(id, req.body);
    if (!updatedEvent) {
      res.status(404).send({
        message: "Cannot update event with id=" + id + ". Event was not found",
      });
    } else {
      res.send({ message: "Event was succesfully updated." });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating event with id" + id });
  }
};

const deleteOneEvent = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedEvent = await eventService.deleteOneEvent(id);
    if (!deletedEvent) {
      res.status(404).send({
        message: "Cannot delete event with id=" + id + ". Event was not found",
      });
    } else {
      res.send({ message: "Event was succesfully delete." });
    }
  } catch (err) {
    res.status(500).send({ message: "Error deleting event with id" + id });
  }
};

module.exports = {
  createNewEvent,
  getAllEvents,
  getEventById,
  updateOneEvent,
  deleteOneEvent,
};
