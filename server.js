require("dotenv-flow").config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const yaml = require("yamljs");
const bodyParser = require("body-parser");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerDefinition = yaml.load("./swagger.yaml");
const swaggerUi = require("swagger-ui-express");

// Import auth middleware
// const { verifyToken } = require("./validation");

// Create express app
const app = express();

// Set up swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
app.use(bodyParser.json());

// Routes
app.use("/api/event", eventRoutes);
app.use("/api/user", authRoutes);

// Open mongoose connection
mongoose
  .connect(process.env.DBHOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Error connecting to MongoDb: " + error));
mongoose.connection.once("open", () =>
  console.log("Connected succesfully to MongoDb")
);

// Set the port
const PORT = process.env.PORT || 4000;

// Listen to requests
app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

module.exports = app;
