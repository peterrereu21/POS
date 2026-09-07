const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const usersFile = path.join(dataDir, 'users.json');
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([] , null, 2));

const read = () => JSON.parse(fs.readFileSync(usersFile, 'utf8'));
const write = (arr) => fs.writeFileSync(usersFile, JSON.stringify(arr, null, 2));

module.exports = {
  findByEmail: async (email) => {
    const arr = read();
    return arr.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || null;
  },
  createUser: async ({ name, email, password }) => {
    const arr = read();
    const exists = arr.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('UserExists');
    const id = arr.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = { id, name, email: email.toLowerCase(), passwordHash: hash, createdAt: new Date().toISOString() };
    arr.push(user);
    write(arr);
    return { id: user.id, name: user.name, email: user.email };
  },
  verifyPassword: async (email, password) => {
    const user = await module.exports.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash || '');
    if (!ok) return null;
    return { id: user.id, name: user.name, email: user.email };
  },
  setResetToken: async (email) => {
    const arr = read();
    const idx = arr.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (idx === -1) return null;
    const token = crypto.randomBytes(20).toString('hex');
    const expires = Date.now() + 1000 * 60 * 60; // 1 hour
    arr[idx].resetToken = token;
    arr[idx].resetExpires = expires;
    write(arr);
    return token;
  }
};
