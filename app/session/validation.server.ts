import * as z from 'zod';

/**
 * @remarks Regex pattern that requires number, special character, and upper case character
 */
const PWD_REGEX_PATTERN =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

export const loginSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(3, 'Username must be at least 3 characters long.'),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(8, 'Password must be at least 8 characters long.'),
});

const passwordValidation = z.object({
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .regex(
      PWD_REGEX_PATTERN,
      'Password must include special characters, numbers, and upper case letters.'
    )
    .min(8, 'Password must be at least 8 characters long.'),
  passwordConfirmation: z.string({
    required_error: 'Password Confirmation is required.',
  }),
});

export const registerSchema = loginSchema
  .merge(passwordValidation)
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Provided passwords don't match.",
    path: ['passwordConfirmation'],
  });

export const ZodLoginErrors = z.object({
  errors: z.object({
    username: z.array(z.string()),
    password: z.array(z.string()),
  }),
});

export const ZodRegisterErrors = z.object({
  errors: z.object({
    username: z.array(z.string()),
    password: z.array(z.string()),
    passwordConfirmation: z.array(z.string()),
  }),
});

export type LoginActionData = z.infer<typeof ZodLoginErrors>;
export type RegisterActionData = z.infer<typeof ZodRegisterErrors>;
