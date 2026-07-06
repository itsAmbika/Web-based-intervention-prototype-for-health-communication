import { z } from 'zod';

export const questionSchema = z.object({
  text: z.string().min(5, 'Question text must be at least 5 characters'),
  diseaseId: z.string().min(1, 'Please select a disease'),
  stage: z.enum(['Diagnosis', 'Treatment', 'Survivorship', 'Palliative'], {
    errorMap: () => ({ message: 'Please select a stage' }),
  }),
  categoryId: z.string().min(1, 'Please select a category'),
  active: z.boolean().default(true),
  order: z.number().default(0),
});
