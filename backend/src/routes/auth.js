const express = require('express');
const router = express.Router();
const users = require('../users');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const TOKEN_EXP = '8h';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const existing = await users.findByEmail(email);
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const user = await users.createUser({ name, email, password });
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: TOKEN_EXP });
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const ok = await users.verifyPassword(email, password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ sub: ok.id, email: ok.email }, JWT_SECRET, { expiresIn: TOKEN_EXP });
    res.json({ user: ok, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const token = await users.setResetToken(email);
    // In real app: send email with reset link containing token
    if (token) console.log(`Password reset token for ${email}: ${token}`);
    // Always respond with 200 to avoid leaking user existence
    res.json({ message: 'If an account exists, a reset link has been sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
