const router = require("express").Router();
const user = require("../models/user");
const { registerValidation } = require("../validation");
// CRUD

// POST
// route: /api/register/
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  return res.status(200).json({ msg: "Success!" });
});

// route: /api/login/
router.post("/login", async (req, res) => {
  //   data = req.body;
  //   user
  //     .insertMany(data)
  //     .then((data) => {
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).send({ message: err.message });
  //     });
});

module.exports = router;
