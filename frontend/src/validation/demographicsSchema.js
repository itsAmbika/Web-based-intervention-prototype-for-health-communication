import { z } from 'zod';

export const demographicsSchema = z.object({
  dateOfBirth: z.string().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  relation: z.enum(['self', 'caregiver', 'family']).default('self'),
  primaryLanguage: z.string().optional(),
  city: z.string().optional(),
});
