const express = require("express");
const router = express.Router();
const CardSet = require("../models/CardSet");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const sets = await CardSet.find({ user: req.user.id });
  res.json(sets);
});

router.post("/", auth, async (req, res) => {
  const set = new CardSet({
    ...req.body,
    user: req.user.id
  });

  await set.save();
  res.json(set);
});

router.delete("/:id", auth, async (req, res) => {
  await CardSet.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  res.json({ message: "Deleted" });
});

module.exports = router;