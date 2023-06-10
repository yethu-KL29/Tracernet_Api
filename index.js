const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Import Routes
const route = require('./router/userRouter');

dotenv.config();
app.use(express.json());
app.use(cors());
// Connect to DB

// Import Routes

app.use('/', route);


mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
const port = process.env.PORT ||8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
