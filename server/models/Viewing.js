const mongoose = require('mongoose');

// viewing Schema===

const viewingSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Property',
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },  
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,   
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    notes: {
        type: String,
        default: ''
    }   
}, {
    timestamps: true
});

module.exports = mongoose.model('Viewing', viewingSchema);