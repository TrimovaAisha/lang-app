const express = require("express");
const router = express.Router();
const Folder = require("../models/Folder");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const folders = await Folder.find({ user: req.user.id });
  res.json(folders);
});

router.post("/", auth, async (req, res) => {
  const folder = new Folder({
    name: req.body.name,
    user: req.user.id
  });

  await folder.save();
  res.json(folder);
});

router.delete("/:id", auth, async (req, res) => {
  await Folder.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id
  });

  res.json({ message: "Deleted" });
});

module.exports = router;