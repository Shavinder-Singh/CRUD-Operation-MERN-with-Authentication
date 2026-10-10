const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());
app.use(express.json());


// -----
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const bookingRoutes = require('./routes/orders.js');





connectDB();
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/orders/', bookingRoutes);



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
