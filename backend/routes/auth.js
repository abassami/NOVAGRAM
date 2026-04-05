const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// تسجيل مستخدم جديد
router.post('/register', async (req, res) => {
    try {
        const { username, fullName, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: "Username already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, fullName, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Account created!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Wrong password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token, user: { username: user.username, fullName: user.fullName } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
