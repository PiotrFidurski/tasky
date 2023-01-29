import * as z from 'zod';
import { zfd } from 'zod-form-data';

const validationMessages = {
  USERNAME_REQUIRED: 'username is required.',
  USERNAME_LENGTH: 'username must be at least 3 characters long.',
  PASSWORD_LENGTH: 'password must be at least 8 characters long.',
  PASSWORD_REQUIRED: 'password is required.',
};

/**
 * @remarks Regex pattern that requires number, special character, and upper case character
 */
const PWD_REGEX_PATTERN =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

export const loginSchema = zfd.formData({
  username: zfd.text(
    z
      .string({
        required_error: validationMessages.USERNAME_REQUIRED,
      })
      .min(3, validationMessages.USERNAME_LENGTH)
  ),
  password: zfd.text(
    z
      .string({
        required_error: validationMessages.PASSWORD_REQUIRED,
      })
      .min(8, validationMessages.PASSWORD_LENGTH)
  ),
});

export const registerSchema = zfd
  .formData({
    username: zfd.text(
      z
        .string({
          required_error: validationMessages.USERNAME_REQUIRED,
        })
        .min(3, validationMessages.USERNAME_LENGTH)
    ),
    password: zfd.text(
      z
        .string({
          required_error: validationMessages.PASSWORD_REQUIRED,
        })
        .min(8, validationMessages.PASSWORD_LENGTH)
        .regex(
          PWD_REGEX_PATTERN,
          'password must include special characters, numbers, and upper case letters.'
        )
    ),
    passwordConfirmation: zfd.text(
      z.string({
        required_error: 'password Confirmation is required.',
      })
    ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "provided passwords don't match.",
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
