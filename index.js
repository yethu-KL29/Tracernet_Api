const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const multer = require('multer');
const fs = require('fs');
const Image = require('./models/lostModel');

// Import Routes
const route = require('./router/userRouter');

dotenv.config();
app.use(express.json());
app.use(cors());
// Connect to DB

// Import Routes

app.use('/', route);

//for Lost section

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('testImage'), async (req, res) => {
  try {
    const { name, description, location, age, contactnum, gender } = req.body;
    let imageData = {
      data: fs.readFileSync('./missing.jpeg'), // Read default image
      contentType: 'image/png',
    };

    if (req.file) {
      imageData = {
        data: fs.readFileSync(`uploads/${req.file.filename}`),
        contentType: 'image/png',
      };
    }

    const saveImage = new Image({
      name,
      description,
      location,
      age,
      contactnum,
      gender,
      img: imageData,
    });

    await saveImage.save();
    res.status(200).send('IMAGE SAVED');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});


// Found Image Section


const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploadFound');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadFound = multer({ storage: storage2 });

app.post('/Found', uploadFound.single('testImage'), async (req, res) => {
  try {
    const { name, description, location, age, contactnum, gender } = req.body;
    let imageData = {
      data: fs.readFileSync('./missing.jpeg'), // Read default image
      contentType: 'image/png',
    };

    if (req.file) {
      imageData = {
        data: fs.readFileSync(`uploadFound/${req.file.filename}`),
        contentType: 'image/png',
      };
    }

    const saveImage = new Image({
      name,
      description,
      location,
      age,
      contactnum,
      gender,
      img: imageData,
    });

    await saveImage.save();
    res.status(200).send('IMAGE SAVED');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error.message);
});

mongoose
  .connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  });
  
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
