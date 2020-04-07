const mongoose = require("mongoose");

const celebritySchema = mongoose.Schema({
  name: { type: String, required: true },
  occupation: { type: String },
  catchPhrase: String
});

module.exports = mongoose.model("Celebrity", celebritySchema);
