const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// === init
const app = express();
app.use(cors());
app.use(express.json());

//=== connect to MongoDB ====
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
    res.send('API is running..');
    });

// ==== start the server port
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running port ${process.env.PORT || 3000}`);
});


// === import routes ==========================
const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/properties', propertyRoutes);

// === import client routes ==========================
const clientRoutes = require('./routes/clientRoutes');  
app.use('/api/clients', clientRoutes);

// === import viewing routes ==========================
const viewingRoutes = require('./routes/viewingRoutes');
app.use('/api/viewings', viewingRoutes);