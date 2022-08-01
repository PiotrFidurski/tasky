import * as z from 'zod';
import { zfd } from 'zod-form-data';

import { isValidDateFormat } from '~/utils/date';

export const schema = zfd.formData({
  body: zfd.text(
    z
      .string({ required_error: 'body is required.' })
      .min(3, 'body should be at least 3 characters long.')
  ),
  title: zfd.text(
    z
      .string({ required_error: 'title is required.' })
      .min(3, 'title should be at least 3 characters long.')
  ),
});

export const dateSchema = zfd.formData({
  date: zfd.text(
    z
      .string({ required_error: 'date is required.' })
      .refine((val) => isValidDateFormat(val), {
        message: 'date must be yyyy-MM-dd format.',
      })
  ),
});
