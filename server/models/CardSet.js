const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  term: String,
  definition: String
});

const cardSetSchema = new mongoose.Schema({
  title: String,
  cards: [cardSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("CardSet", cardSetSchema);