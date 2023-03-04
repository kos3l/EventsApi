import mongoose, { HydratedDocument, Model } from "mongoose";
import { EventDocument } from "../models/documents/EventDocument";
import { ICreateEventDTO } from "../models/dto/event/ICreateEventDTO";
import { IUpdateEventDTO } from "../models/dto/event/IUpdateEventDTO";
import { DatePrecision } from "../models/types/DatePrecision";
import { IEventQueryParams } from "../models/util/IEventQueryParams";

const DateHelper = require("../utils/helpers/Date.helper");
const Event: HydratedDocument<
  EventDocument,
  Model<EventDocument>
> = require("../models/schemas/user.ts");

const createNewEvent = async (
  newEvent: ICreateEventDTO
): Promise<HydratedDocument<EventDocument>> => {
  console.log("abcddaaaa");
  const createdEvent: HydratedDocument<EventDocument> = await Event.create(
    newEvent
  );
  return createdEvent;
};

const getAllEvents = async (
  userId: mongoose.Types.ObjectId,
  isArchived: boolean
): Promise<HydratedDocument<EventDocument>[]> => {
  const findArgs: IEventQueryParams =
    isArchived != undefined && isArchived != null
      ? {
          createdBy: userId,
          isArchived: isArchived,
        }
      : {
          createdBy: userId,
        };

  const allEvents: HydratedDocument<EventDocument>[] = await Event.find(
    findArgs
  );
  return allEvents;
};

const getAllEventsByDate = async (
  userId: mongoose.Types.ObjectId,
  date: Date,
  datePrecision: DatePrecision
): Promise<HydratedDocument<EventDocument>[]> => {
  let findArgs: IEventQueryParams = {
    createdBy: userId,
    startDate: !datePrecision
      ? {
          $gte: DateHelper.calculateStartOfPeriod(date, "month"),
          $lte: DateHelper.calculateEndOfPeriod(date, "month"),
        }
      : {
          $gte: DateHelper.calculateStartOfPeriod(date, datePrecision),
          $lte: DateHelper.calculateEndOfPeriod(date, datePrecision),
        },
  };

  const allEvents: HydratedDocument<EventDocument>[] = await Event.find(
    findArgs
  );
  return allEvents;
};

const getEventById = async (
  id: mongoose.Types.ObjectId
): Promise<HydratedDocument<EventDocument> | null> => {
  const event: HydratedDocument<EventDocument> | null = await Event.findById(
    id
  );
  return event;
};

const updateOneEvent = async (
  id: mongoose.Types.ObjectId,
  updatedEvent: IUpdateEventDTO
): Promise<HydratedDocument<EventDocument> | null> => {
  const event: HydratedDocument<EventDocument> | null =
    await Event.findByIdAndUpdate(id, updatedEvent);
  return event;
};

const deleteOneEvent = async (
  id: mongoose.Types.ObjectId
): Promise<HydratedDocument<EventDocument> | null> => {
  const deletedEvent: HydratedDocument<EventDocument> | null =
    await Event.findByIdAndDelete(id);
  return deletedEvent;
};

module.exports = {
  getAllEvents,
  getAllEventsByDate,
  getEventById,
  createNewEvent,
  updateOneEvent,
  deleteOneEvent,
};
