// const express = require('express');
// const router = express.Router();
// const Message = require('../models/Message');

// router.post('/', async (req, res) => {
//  try {
//    const message = new Message(req.body);
//    await message.save();
//    res.status(201).send(message);
//  } catch (err) {
//    res.status(500).send(err);
//  }
// });

// router.get('/', async (req, res) => {
//  try {
//    const messages = await Message.find().sort({ timestamp: -1 });
//    res.send(messages);
//  } catch (err) {
//    res.status(500).send(err);
//  }
// });

// module.exports = router;