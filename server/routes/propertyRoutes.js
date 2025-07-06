const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// === get all properties =
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties', error });
    }
});

// === get property by id === get
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching property', error });
    }  
});

// === create a new property === post 
router.post('/', async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        console.error("Error creating property:", error); 
        res.status(400).json({ message: 'Error creating property', error });
    }
}); 

// === update a property by id === put
router.put('/:id', async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id, 
            req.body, { new: true });    
        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }   
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: 'Error updating property', error });
    }
});

// Patch ======== Archive
router.patch('/:id/archive', async (req, res) => {
    try {
        const archivedProperty = await Property.findByIdAndUpdate(
            req.params.id, 
            { archived: true }, 
            { new: true }
        );
        if (!archivedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(archivedProperty);
    } catch (error) {
        res.status(400).json({ message: 'Error archiving property', error });
    }   

  });



// === delete a property by id === delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting property', error });
    }
}); 

// === export the router ===
module.exports = router;