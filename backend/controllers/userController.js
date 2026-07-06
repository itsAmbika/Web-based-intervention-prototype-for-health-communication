const { z } = require('zod');
const User = require('../models/User');

const demographicsSchema = z.object({
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  relation: z.enum(['self', 'caregiver', 'family']).optional(),
  primaryLanguage: z.string().optional(),
  city: z.string().optional(),
});

const patchSchema = z.object({
  name: z.string().min(2).optional(),
  demographics: demographicsSchema.optional(),
});

/**
 * GET /api/users/me
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash -googleId');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/users/me
 */
const updateMe = async (req, res, next) => {
  try {
    const data = patchSchema.parse(req.body);

    const updateData = {};
    if (data.name) updateData.name = data.name;
    if (data.demographics) {
      updateData.demographics = data.demographics;
      updateData.demographicsCompleted = true;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    }).select('-passwordHash -googleId');

    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe, updateMe };
