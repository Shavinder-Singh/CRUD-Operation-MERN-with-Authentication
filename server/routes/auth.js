const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyUser, updatePassword, deleteAccount } = require('../controller/authController');
const { protect } = require('../middleware/auth.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/updatepassword/:id', protect, updatePassword);
router.delete('/deleteaccount/:id', protect, deleteAccount);
// router.get('/verifyOTP', verifyUser);



module.exports = router;