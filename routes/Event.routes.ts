import { Router } from "express";
const router: Router = require("express").Router();
const eventController = require("../controllers/Event.controller");

// route: /api/event/
router.post("/", eventController.createNewEvent);

// route: /api/event/:id
router.get("/:id", eventController.getEventById);

// route: /api/event/date/:date?datePrecision=
router.get("/date/:date", eventController.getAllEventsByDate);

// route: /api/event?isArchived=
router.get("/", eventController.getAllEvents);

// route: /api/event/:id
router.put("/:id", eventController.updateOneEvent);

// route: /api/event/:id
router.delete("/:id", eventController.deleteOneEvent);

export = router;
