const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//Generate Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

//Signup
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        //if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        else {
            const gensalt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, gensalt);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role: "user"
            });
            await newUser.save();
            res.status(201).json({
                message: "User registered successfully"
            })
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err: err.message });
    }
};

//Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        //if user logins
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user.id, user.role)
        })
    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err: err.message });
    }
};


//Update Password

exports.updatePassword = async (req, res) => {
    try {
        const { newPassword, currentPassword, confirmPassword } = req.body;

        // if password is not entered by user
        if (!newPassword || !currentPassword || !confirmPassword) {
            return res.status(400).json({
                message: "All Password fields are required"
            })
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New passwords do not match"
            });
        }


        //Find A user By Id
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

        //generate New Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            message: "Password updated successfully"
        });

    }
    catch (err) {
        res.status(400).json({ message: err })
    }
};

// Delete Password
exports.deleteAccount = async (req, res) => {
    try {
        const { currentPassword } = req.body;

        // if password is not entered by user
        if (!currentPassword) {
            return res.status(400).json({
                message: "Please Enter Password To Delete Account"
            })
        }

        //Find A user By Id
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "password is incorrect"
            });
        }
        await user.deleteOne();
        return res.status(200).json({
            message: "Account deleted successfully"
        });
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

