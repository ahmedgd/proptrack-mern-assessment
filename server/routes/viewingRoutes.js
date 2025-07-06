const express = require('express');
const router = express.Router();
const Viewing = require('../models/Viewing');

// === get all viewings ===
router.get('/', async (req, res) => {
  try {
    const viewings = await Viewing.find()
      .populate('propertyId', 'title price location')
      .populate('clientId', 'name email phone');

    if (!viewings || viewings.length === 0) {
      return res.status(404).json({ message: 'No viewings found' });
    }

    res.status(200).json(viewings);
  } catch (error) {
    console.error('Error fetching viewings:', error);
    res.status(500).json({ message: 'Error fetching viewings', error });
  }
});

// === create a new viewing ===
router.post('/', async (req, res) => {
  try {
    const { propertyId, clientId, date, time } = req.body;

    if (!propertyId || !clientId || !date || !time) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newViewing = new Viewing({
      ...req.body,
      status: 'scheduled', // default status
    });

    const savedViewing = await newViewing.save();

    // fix populate
    const populatedViewing = await Viewing.findById(savedViewing._id)
      .populate('propertyId', 'title price location')
      .populate('clientId', 'name email phone');

    res.status(201).json(populatedViewing);
  } catch (error) {
    console.error('Error creating viewing:', error);
    res.status(400).json({ message: 'Error creating viewing', error });
  }
});

// === update a viewing by id ===
router.put('/:id', async (req, res) => {
  try {
    const updatedViewing = await Viewing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('propertyId', 'title price location')
      .populate('clientId', 'name email phone');

    if (!updatedViewing) {
      return res.status(404).json({ message: 'Viewing not found' });
    }

    res.status(200).json(updatedViewing);
  } catch (error) {
    console.error('Error updating viewing:', error);
    res.status(400).json({ message: 'Error updating viewing', error });
  }
});

// === delete a viewing by id ===
router.delete('/:id', async (req, res) => {
  try {
    const deletedViewing = await Viewing.findByIdAndDelete(req.params.id);
    if (!deletedViewing) {
      return res.status(404).json({ message: 'Viewing not found' });
    }
    res.status(200).json({ message: 'Viewing deleted successfully' });
  } catch (error) {
    console.error('Error deleting viewing:', error);
    res.status(500).json({ message: 'Error deleting viewing', error });
  }
});

module.exports = router;
