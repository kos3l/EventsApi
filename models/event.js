const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let eventSchema = new Schema({
  name: { type: String },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  address: { type: String },
});

module.export = mongoose.model("event", eventSchema);
