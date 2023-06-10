const { Lost } = require('../models/lostModel');


const uploadLoast =  async (req, res) => {
  const { name, address, location, contactNumber } = req.body;

  try {
    const lost = new Lost({
      image: req.file.filename // Save the filename of the uploaded image
    });

    await lost.save();

    res.status(201).json({ message: 'lost added  successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    uploadLoast
    };
