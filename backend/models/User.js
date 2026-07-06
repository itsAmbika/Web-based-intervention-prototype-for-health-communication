const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const demographicsSchema = new mongoose.Schema(
  {
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer_not_to_say'] },
    relation: { type: String, enum: ['self', 'caregiver', 'family'], default: 'self' },
    primaryLanguage: { type: String, default: 'en' },
    city: { type: String, default: '' },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, default: null }, // null for Google OAuth users
    googleId: { type: String, default: null },
    role: { type: String, enum: ['patient', 'admin'], default: 'patient' },
    demographics: { type: demographicsSchema, default: null },
    demographicsCompleted: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash') || !this.passwordHash) return;
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
});

// Compare password
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

// Never send passwordHash or googleId to client
userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.googleId;
  return obj;
};


module.exports = mongoose.model('User', userSchema);
