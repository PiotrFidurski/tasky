import * as z from 'zod';
import { zfd } from 'zod-form-data';

/**
 * @remarks Regex pattern that requires number, special character, and upper case character
 */
const PWD_REGEX_PATTERN =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

export const loginSchema = zfd.formData({
  username: zfd.text(
    z
      .string({
        required_error: 'Username is required.',
      })
      .min(3, 'Username must be at least 3 characters long.')
  ),
  password: zfd.text(
    z
      .string({
        required_error: 'Password is required.',
      })
      .min(8, 'Password must be at least 8 characters long.')
  ),
});

export const registerSchema = zfd
  .formData({
    username: zfd.text(
      z
        .string({
          required_error: 'Username is required.',
        })
        .min(3, 'Username must be at least 3 characters long.')
    ),
    password: zfd.text(
      z
        .string({
          required_error: 'Password is required.',
        })
        .min(8, 'Password must be at least 8 characters long.')
        .regex(
          PWD_REGEX_PATTERN,
          'Password must include special characters, numbers, and upper case letters.'
        )
    ),
    passwordConfirmation: zfd.text(
      z.string({
        required_error: 'Password Confirmation is required.',
      })
    ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Provided passwords don't match.",
    path: ['passwordConfirmation'],
  });

const errorLoginFields = {
  username: z.array(z.string()),
  password: z.array(z.string()),
};

export const ZodLoginErrors = z.object({
  errors: z.object(errorLoginFields),
});

export const ZodRegisterErrors = z.object({
  errors: z.object({
    ...errorLoginFields,
    passwordConfirmation: z.array(z.string()),
  }),
});
