// routes/subscribers.js
const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const mailchimp = require('../mailchimp');

// Route to subscribe a new email
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ msg: 'Email is required' });

  try {
    // Add subscriber to MongoDB
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    // Add subscriber to Mailchimp
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    });

    res.status(200).json({ msg: 'Successfully subscribed' });
  } catch (error) {
    res.status(500).json({ msg: 'Error subscribing', error });
  }
});

// Route to get total subscribers count
router.get('/count', async (req, res) => {
  try {
    const count = await Subscriber.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching subscriber count', error });
  }
});

module.exports = router;
