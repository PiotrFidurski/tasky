import * as z from 'zod';
import { zfd } from 'zod-form-data';

import { isValidDateFormat } from '~/utils/date';

export const ZodTaskErrors = z.object({
  errors: z.object({
    body: z.array(z.string()),
    title: z.array(z.string()),
    date: z.array(z.string()),
  }),
});

export const schema = zfd.formData({
  body: zfd.text(
    z
      .string({ required_error: 'Task body is required.' })
      .min(3, 'Body should be at least 3 characters long.')
  ),
  title: zfd.text(
    z
      .string({ required_error: 'Task title is required.' })
      .min(3, 'Title should be at least 3 characters long.')
  ),
});

export const dateSchema = zfd.formData({
  date: zfd.text(
    z
      .string({ required_error: 'Date is required.' })
      .refine((val) => isValidDateFormat(val), {
        message: 'date must be yyyy-MM-dd format.',
      })
  ),
});
