const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const Lost = require('../models/lostModel');



require ('dotenv').config();


const userRegister = async (req, res) => {

    const { username, password, email } = req.body;
    let user;
    try {
        user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({
            message: 'User already exists',
          });
        }
        const hashedPassword = await bcrypt.hashSync(password)
        user = new User({
          username,
          email,
          password: hashedPassword,
       
    
    
        });
    
        await user.save();
        res.status(200).json({
          message: user,
        });
    
      } catch (error) {
        console.log(error)
        res.status(500).json({
          message: error.message,
    
        });
    
      }
    };

    const userLogin = async (req, res) => {
        const { email, password } = await req.body;
        // const generateToken = (id) => {
        //   return jwt.sign({ id }, process.env.JWT_SECRETKEY, {
        //     expiresIn: '30d'
        //   })
        // }
        let existingUser;
        try {
          existingUser = await User.findOne({ email })
          if (!existingUser) {
            return res.status(404).json({
              message: 'User does not exist',
            });
          }
          const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
          if (!isPasswordCorrect) {
            return res.status(400).json({
              message: 'Invalid credentials',
            });
          }
        //   const token = generateToken(existingUser._id)
      
        //   res.cookie('token', token, {
        //     path: "/",
        //     expires: new Date(Date.now() + 1000 * 30000),
        //     httpOnly: true,
        //     sameSite: 'none',
      
      
        //   })
      
          return res.status(200).json({ status: "200", user: existingUser})
        } catch (error) {
          res.status(500).json({
            message: error.message,
          });
        }
      }


      const getLostdata =async(req,res)=>{
        try {
          const lostdata = await Lost.find();
          res.status(200).json({
            message: lostdata,
          });
        } catch (error) {
          res.status(500).json({
            message: error.message,
          });
        }
      }



module.exports ={
    userRegister,
    userLogin,
    getLostdata,
}
 