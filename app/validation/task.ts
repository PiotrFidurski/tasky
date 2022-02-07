import * as z from 'zod';
import { zfd } from 'zod-form-data';

export const ZodTaskErrros = z.object({
  errors: z.object({
    body: z.array(z.string()),
  }),
});

export const schema = zfd.formData({
  body: zfd.text(
    z
      .string({ required_error: 'Task body is required.' })
      .min(3, 'Body should be at least 3 characters long.')
  ),
});
