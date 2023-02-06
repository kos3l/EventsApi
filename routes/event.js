const router = require("express").Router();
const event = require("../models/event");

// CRUD

// POST
// route: /api/event/
router.post("/", (req, res) => {
  data = req.body;
  event
    .insertMany(data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// GET
// route: /api/event/
router.get("/", (req, res) => {
  event
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// route: /api/event/:id
router.get("/:id", (req, res) => {
  event
    .findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

// PUT
// DELETE

module.exports = router;
