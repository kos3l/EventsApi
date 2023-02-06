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
// PUT
// DELETE

module.exports = router;
