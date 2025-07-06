const mongoose = require('mongoose');

// = === Property Schema ===
const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['rent', 'sale'],
        required: true
    },
    location: {
        type: String,
    },
    bedrooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,
    },
    area: {
        type: Number,
    },
    amenities: {
        type: [String],
    },
    images: {
        type: [String],
    },
    archived: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
