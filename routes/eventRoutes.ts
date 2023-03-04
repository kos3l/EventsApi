import { ExtendedRequest } from "../models/util/IExtendedRequest";
import { Response } from "express";
const router = require("express").Router();
const eventController = require("../controllers/EventController");

// route: /api/event/
router.post("/", eventController.createNewEvent);

// route: /api/event?isArchived=
router.get("/", eventController.getAllEvents);

// route: /api/event/:date?datePrecision=
router.get("/:date", eventController.getAllEventsByDate);

// route: /api/event/:id
// router.get("/:id", eventController.getEventById);
router.get("/:id", (req: ExtendedRequest, res: Response) => {
  res.send("hi");
});

// route: /api/event/:id
router.put("/:id", eventController.updateOneEvent);

// route: /api/event/:id
router.delete("/:id", eventController.deleteOneEvent);

export = router;
