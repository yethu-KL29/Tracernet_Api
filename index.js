const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const multer = require('multer');
const fs = require('fs');
const  Image  = require('./models/lostModel');

// Import Routes
const route = require('./router/userRouter');

dotenv.config();
app.use(express.json());
app.use(cors());
// Connect to DB

// Import Routes

app.use('/', route);


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: (req, file, cb)=> {
		cb(null, `${(Date.now())}_${file.originalname}`);
	}
});

const upload = multer({ storage: storage });


app.post("/upload", upload.single("testImage"), async (req, res) => {
	try {
	  const saveImage = new Image({
		name: req.body.name,
		img: {
		  data: fs.readFileSync("uploads/" + req.file.filename),
		  contentType: "image/png",
		},
	  });
  
	   await saveImage.save();
	  res.status(200).send('IMAGE SAVED');
	} catch (err) {
	  console.log(err);
	  res.status(500).send("Internal Server Error");
	}
  });
  
  process.on('unhandledRejection', error => {
	console.log('unhandledRejection', error.message);
  });

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
    })
const port = process.env.PORT ||8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
