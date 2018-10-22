const mongoose = require("mongoose");
const express = require("express");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, require: true },
  genre: String,
  plot: String,
  _star: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }]
});

module.exports = mongoose.model("Movie", movieSchema);
