const router = require("express").Router();
const eventController = require("../controllers/eventController");

// POST
// route: /api/event/
router.post("/", eventController.createNewEvent);

// GET
// route: /api/event/
router.get("/", eventController.getAllEvents);

// route: /api/event/:id
router.get("/:id", eventController.getEventById);

// PUT
// route: /api/event/:id
router.put("/:id", eventController.updateOneEvent);

// DELETE
// route: /api/event/:id
router.delete("/:id", eventController.deleteOneEvent);

module.exports = router;
