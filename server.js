const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const eventRoutes = require("./routes/event");
const authRoutes = require("./routes/auth");
require("dotenv-flow").config();
const { verifyToken } = require("./validation");

app.use(bodyParser.json());

// routes
app.get("/api/welcome", (req, res) => {
  res.status(200).send({ message: "Welcome to the API" });
});

mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDb: " + error));
mongoose.connection.once("open", () =>
  console.log("Connected succesfully to MongoDb")
);

app.use("/api/event", verifyToken, eventRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

module.exports = app;
