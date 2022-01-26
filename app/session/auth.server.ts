import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { redirect } from 'remix';
import * as z from 'zod';
import { db } from '~/db/db.server';
import { getUserSession } from './session.server';

/**
 * Partial fields of User Model
 */
type UserInput = Pick<User, 'username' | 'password'>;

/**
 * Retrieves user for the session from the database.
 *
 * @param {Request} request - request Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @returns `User` | `Response` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export async function getUser({ request }: { request: Request }) {
  const session = await getUserSession({ request });

  if (!session.data.userId) {
    return redirect('/login');
  }

  const user = await db.user.findFirst({
    where: { id: session.data?.userId },
  });

  return user;
}

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
  password: z.string({
    required_error: 'Password is required.',
  }),
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

/**
 * Checks database for user existence.
 *
 * @param {string} username - Username of the user.
 * @returns `User` or `null`
 */
export async function login({ username }: UserInput) {
  const user = await db.user.findFirst({
    where: { username },
  });

  return user;
}

/**
 * Creates user in the database.
 *
 * @param {string} username - Username of the user.
 * @param {string} password - Password of the user.
 * @returns `Promise<User>`
 */
export async function register({ username, password }: UserInput) {
  const passwordHash = await bcrypt.hash(password, 10);

  return db.user.create({
    data: {
      username,
      password: passwordHash,
    },
  });
}
