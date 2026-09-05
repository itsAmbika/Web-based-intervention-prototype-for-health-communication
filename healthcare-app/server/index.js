const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const patientRouter = require('./routes/patientRoutes');
const caregiverRouter = require('./routes/caregiverRoutes');
const adminRouter = require('./routes/adminRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', patientRouter);
app.use('/api', caregiverRouter);
app.use('/api', adminRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
