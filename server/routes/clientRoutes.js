const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// === get all clients leads inquiries ===
router.get('/', async (req, res) => {
  try {
    const leads = await Client.find().populate('interestedProperties');
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error });
  }
});

// === create a new client lead inquiry ===
router.post('/', async (req, res) => {
  try {
    const newLead = new Client(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: 'Error creating lead', error });
  }
});

// === delete a client lead inquiry by id ===
router.delete('/:id', async (req, res) => {
  try {
    const deletedLead = await Client.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead', error });
  }
});

// === update client status ===
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["new", "contacted", "follow-up", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
});

module.exports = router;
