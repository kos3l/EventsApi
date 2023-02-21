const eventService = require("../services/event.service");

const createNewEvent = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;
  if (new Date(data[0].startDate) < new Date()) {
    res.status(400).send({ message: "Events can't be created in the past" });
    return;
  }
  try {
    const newEvent = await eventService.createNewEvent(...data, userId);
    res.send(newEvent);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllEvents = async (req, res) => {
  const userId = req.user.id;
  const isArchived = req.query.isArchvied;

  try {
    const allEvents = await eventService.getAllEvents(userId, isArchived);
    res.send(allEvents);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getAllEventsByDate = async (req, res) => {
  const userId = req.user.id;
  const date = req.params.date;
  // "day" || "month" || "year"
  const datePrecision = req.query.datePrecision;

  try {
    const allEvents = await eventService.getAllEventsByDate(
      userId,
      date,
      datePrecision
    );
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
    res.status(500).send({ message: err.message });
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
  getAllEventsByDate,
  getEventById,
  updateOneEvent,
  deleteOneEvent,
};
