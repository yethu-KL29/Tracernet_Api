const router = require('express').Router();

const { userRegister, userLogin } = require('../controller/userController');

router.post('/register', userRegister);
router.post('/login', userLogin);
// router.post('/lost', upload.single('image'), (req, res) => {
//     uploadLoast(req, res);
//   });
module.exports = router;