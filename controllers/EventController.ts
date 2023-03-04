import { ICreateEventDTO } from "../models/dto/event/ICreateEventDTO";
import { Request, Response } from "express";
import { ExtendedRequest } from "../models/util/IExtendedRequest";

const eventService = require("../services/event.service");

const createNewEvent = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  const data = req.body;
  const userId = 1;

  let eventData: ICreateEventDTO = {
    ...data,
    createdBy: userId,
  };

  if (new Date(data[0].startDate) < new Date()) {
    return res
      .status(400)
      .send({ message: "Events can't be created in the past" });
  }
  try {
    const newEvent = await eventService.createNewEvent(eventData);
    return res.send(newEvent);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const getAllEvents = async (req: ExtendedRequest, res: Response) => {
  const userId = 1;
  const isArchived = req.query.isArchvied;

  try {
    const allEvents = await eventService.getAllEvents(userId, isArchived);
    return res.send(allEvents);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const getAllEventsByDate = async (req: ExtendedRequest, res: Response) => {
  const userId = 1;
  const date = req.params.date;
  // "day" || "month" || "year"
  const datePrecision = req.query.datePrecision;

  try {
    const allEvents = await eventService.getAllEventsByDate(
      userId,
      date,
      datePrecision
    );
    return res.send(allEvents);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const getEventById = async (req: ExtendedRequest, res: Response) => {
  try {
    const oneEvent = await eventService.getEventById(req.params.id);
    return res.send(oneEvent);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const updateOneEvent = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;

  try {
    const updatedEvent = await eventService.updateOneEvent(id, req.body);

    if (!updatedEvent) {
      return res.status(404).send({
        message: "Cannot update event with id=" + id + ". Event was not found",
      });
    } else {
      return res.send({ message: "Event was succesfully updated." });
    }
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteOneEvent = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;

  try {
    const deletedEvent = await eventService.deleteOneEvent(id);
    if (!deletedEvent) {
      return res.status(404).send({
        message: "Cannot delete event with id=" + id + ". Event was not found",
      });
    } else {
      return res.send({ message: "Event was succesfully delete." });
    }
  } catch (err: any) {
    return res
      .status(500)
      .send({ message: "Error deleting event with id" + id });
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
