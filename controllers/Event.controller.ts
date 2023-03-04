import { ICreateEventDTO } from "../models/dto/event/ICreateEventDTO";
import { Response } from "express";
import { ExtendedRequest } from "../models/util/IExtendedRequest";
import { HydratedDocument } from "mongoose";
import { EventDocument } from "../models/documents/EventDocument";
import { DatePrecision } from "../models/types/DatePrecision";
const eventService = require("../services/Event.service");

const createNewEvent = async (
  req: ExtendedRequest,
  res: Response
): Promise<Response> => {
  const data = req.body;

  if (!req.user) {
    return res.status(500).send({ message: "Not Authorised!" });
  }
  const userId = req.user;

  let eventData: ICreateEventDTO = {
    ...data[0],
    createdBy: userId,
  };

  if (new Date(data[0].startDate) < new Date()) {
    return res
      .status(400)
      .send({ message: "Events can't be created in the past" });
  }
  try {
    const newEvent: HydratedDocument<EventDocument> =
      await eventService.createNewEvent(eventData);
    return res.send(newEvent);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const getAllEvents = async (req: ExtendedRequest, res: Response) => {
  if (!req.user) {
    return res.status(500).send({ message: "Not Authorised!" });
  }

  const userId: string = req.user;
  const isArchived: boolean = req.query.isArchived === "true";

  try {
    const allEvents: HydratedDocument<EventDocument>[] =
      await eventService.getAllEvents(userId, isArchived);

    return res.send(allEvents);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const getAllEventsByDate = async (req: ExtendedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).send({ message: "Not Authorised!" });
  }
  const userId: string = req.user;
  let date: Date = new Date();

  if (req.params.date) {
    const dateObj: Date = new Date(req.params.date.toString());
    date =
      dateObj instanceof Date && !!dateObj.getDate() ? dateObj : new Date();
  }
  const precisionTypes = ["week", "month", "year"] as const;
  type DatePrecision1 = typeof precisionTypes[number];
  let datePrecision: DatePrecision1 = "year";
  if (req.query.datePrecision) {
    const stringDatePrecision: any = req.query.datePrecision.toString();
    datePrecision =
      precisionTypes.indexOf(stringDatePrecision) !== -1
        ? stringDatePrecision
        : "year";
  }

  try {
    const allEvents: HydratedDocument<EventDocument>[] =
      await eventService.getAllEventsByDate(userId, date, datePrecision);
    return res.send(allEvents);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const getEventById = async (req: ExtendedRequest, res: Response) => {
  try {
    const oneEvent: HydratedDocument<EventDocument> =
      await eventService.getEventById(req.params.id);
    return res.send(oneEvent);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const updateOneEvent = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;

  try {
    const updatedEvent: HydratedDocument<EventDocument> =
      await eventService.updateOneEvent(id, req.body);

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
  const id: string = req.params.id;

  try {
    const deletedEvent: HydratedDocument<EventDocument> =
      await eventService.deleteOneEvent(id);
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
