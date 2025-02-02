const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

// Getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/:id", getSubscriber, (req, res) => {
    res.send(res.subscriber);
});

// Creating one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one
router.patch("/:id", getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
        res.subscriber.email = req.body.email;
        res.subscriber.phone = req.body.phone;
    }
    if (req.body.email != null) {
        res.subscriber.email = req.body.email;
    }

    if (req.body.phone != null) {
        res.subscriber.phone = req.body.phone;
    }

    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting one
router.delete("/:id", getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        res.json({ message: "Deleted Subscriber" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router;
