require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const email = process.argv[2];

if (!email) {
  console.error('Please provide an email address.\nUsage: node scripts/make-admin.js your@email.com');
  process.exit(1);
}

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    console.error('No user found with email: ' + email);
    await mongoose.disconnect();
    process.exit(1);
  }

  if (user.role === 'admin') {
    console.log(email + ' is already an admin.');
    await mongoose.disconnect();
    process.exit(0);
  }

  user.role = 'admin';
  await user.save();

  console.log('SUCCESS: ' + email + ' is now an admin! Log out and log back in.');
  await mongoose.disconnect();
  process.exit(0);
})();
