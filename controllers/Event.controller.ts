import { ICreateEventDTO } from "../models/dto/event/ICreateEventDTO";
import { Response } from "express";
import { ExtendedRequest } from "../models/util/IExtendedRequest";
import { HydratedDocument } from "mongoose";
import { EventDocument } from "../models/documents/EventDocument";
import { DatePrecision } from "../models/types/DatePrecision";
import { DateHelper } from "../utils/helpers/Date.helper";
import { PrecisionHelper } from "../utils/helpers/Precision.helper";
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

  let isArchived: boolean | null = null;
  if (req.query.isArchived) {
    isArchived = req.query.isArchived === "true";
  }

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

  if (
    req.params.date == "null" ||
    req.params.date == "undefined" ||
    !req.params.date
  ) {
    return res.status(400).send({ message: "Date parameter is missing!" });
  }

  let date: Date = new Date();
  const dateObj: Date = new Date(req.params.date.toString());

  // checks if the date is a valid Date js object, if not use the current date
  if (DateHelper.checkIfValidDateObject(dateObj)) {
    date = dateObj;
  } else {
    return res.status(400).send({ message: "Invalid Date parameter!" });
  }

  let datePrecision: DatePrecision = "year";
  // checking if the query parameter of datePrecision is one of the DatePrecision type variants, if not default to year
  if (
    req.params.datePrecision !== "null" &&
    req.params.datePrecision !== "undefined" &&
    req.query.datePrecision
  ) {
    const stringDatePrecision: any = req.query.datePrecision.toString();
    datePrecision =
      PrecisionHelper.checkIfValueIsOfTypeDatePrecision(stringDatePrecision) &&
      stringDatePrecision;
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
  const id: string = req.params.id;

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
