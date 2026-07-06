const User = require('../models/User');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  setRefreshCookie,
  clearRefreshCookie,
} = require('../utils/jwt');

/**
 * Build token payload from user document
 */
const buildTokenPayload = (user) => ({
  id: user._id.toString(),
  email: user.email,
  role: user.role,
  name: user.name,
});

/**
 * Sign up with email/password
 */
const signup = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('Email already registered');
    err.status = 409;
    throw err;
  }

  const user = new User({ name, email, passwordHash: password, role: 'patient' });
  await user.save();

  const payload = buildTokenPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return { user: user.toSafeObject(), accessToken, refreshToken };
};

/**
 * Login with email/password
 */
const login = async ({ email, password }) => {
  const user = await User.findOne({ email, active: true });
  if (!user || !user.passwordHash) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const valid = await user.comparePassword(password);
  if (!valid) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const payload = buildTokenPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return { user: user.toSafeObject(), accessToken, refreshToken };
};

/**
 * Handle Google OAuth — find or create user
 */
const handleGoogleUser = async ({ googleId, email, name }) => {
  let user = await User.findOne({ $or: [{ googleId }, { email }] });

  if (!user) {
    user = new User({ name, email, googleId, role: 'patient' });
    await user.save();
  } else if (!user.googleId) {
    user.googleId = googleId;
    await user.save();
  }

  const payload = buildTokenPayload(user);
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return { user: user.toSafeObject(), accessToken, refreshToken };
};

/**
 * Refresh access token using refresh token from cookie
 */
const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const err = new Error('No refresh token');
    err.status = 401;
    throw err;
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    const err = new Error('Invalid or expired refresh token');
    err.status = 401;
    throw err;
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.active) {
    const err = new Error('User not found or deactivated');
    err.status = 401;
    throw err;
  }

  const payload = buildTokenPayload(user);
  const newAccessToken = signAccessToken(payload);
  const newRefreshToken = signRefreshToken(payload); // rotate

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

module.exports = {
  signup,
  login,
  handleGoogleUser,
  refreshAccessToken,
  setRefreshCookie,
  clearRefreshCookie,
};
