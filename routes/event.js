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

// from tutorial - example of get by specific param
// route: /api/event/:inStock
// router.get("/inStock", (req, res) => {
//   event
//     .find({ inStock: true })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err.message });
//     });
// });

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
// route: /api/event/:id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  event
    .findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot update event with id=" + id + ". Event was not found",
        });
      } else {
        res.send({ message: "Event was succesfully updated." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updating event with id" + id });
    });
});

// DELETE
// route: /api/event/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  event
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete event with id=" + id + ". Event was not found",
        });
      } else {
        res.send({ message: "Event was succesfully delete." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting event with id" + id });
    });
});
module.exports = router;
