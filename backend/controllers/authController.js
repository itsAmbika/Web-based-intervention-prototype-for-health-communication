const { z } = require('zod');
const authService = require('../services/authService');

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * POST /api/auth/signup
 */
const signup = async (req, res, next) => {
  try {
    const data = signupSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await authService.signup(data);
    authService.setRefreshCookie(res, refreshToken);
    res.status(201).json({ user, accessToken });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await authService.login(data);
    authService.setRefreshCookie(res, refreshToken);
    res.json({ user, accessToken });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/logout
 */
const logout = (req, res) => {
  authService.clearRefreshCookie(res);
  res.json({ success: true });
};

/**
 * POST /api/auth/refresh
 */
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { accessToken, refreshToken: newRefresh } = await authService.refreshAccessToken(refreshToken);
    authService.setRefreshCookie(res, newRefresh);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/google/callback — called by Passport after Google OAuth
 * Passport attaches req.user = { googleId, email, name }
 */
const googleCallback = async (req, res, next) => {
  try {
    const { googleId, email, name } = req.user;
    const { user, accessToken, refreshToken } = await authService.handleGoogleUser({ googleId, email, name });
    authService.setRefreshCookie(res, refreshToken);
    // Redirect to frontend with token in URL (frontend stores in memory)
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/auth/callback?token=${accessToken}&demographicsDone=${user.demographicsCompleted}`);
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login, logout, refresh, googleCallback };
