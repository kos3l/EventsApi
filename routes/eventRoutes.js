const router = require("express").Router();
const eventController = require("../controllers/eventController");

// route: /api/event/
router.post("/", eventController.createNewEvent);

// route: /api/event/
router.get("/", eventController.getAllEvents);

// route: /api/event/:id
router.get("/:id", eventController.getEventById);

// route: /api/event/:id
router.put("/:id", eventController.updateOneEvent);

// route: /api/event/:id
router.delete("/:id", eventController.deleteOneEvent);

module.exports = router;
