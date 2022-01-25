import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { redirect } from 'remix';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import * as z from 'zod';
import { db } from '~/db/db.server';
import { badRequest } from '~/utils/badRequest';
import {
  createUserSession,
  getUserSession,
  sessionStorage,
} from './session.server';

export const authenticator = new Authenticator<User | Response>(sessionStorage);

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

const loginSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required.',
    })
    .min(3, 'Username must be at least 3 characters long.'),
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

const registerSchema = loginSchema
  .merge(passwordValidation)
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Provided passwords don't match.",
    path: ['passwordConfirmation'],
  });

/**
 * Creates user in the database.
 *
 * @param {string} username - Username of the user.
 * @param {string} password - Password of the user.
 * @returns `Promise<User>`
 */
async function register({ username, password }: UserInput) {
  const passwordHash = await bcrypt.hash(password, 10);

  return db.user.create({
    data: {
      username,
      password: passwordHash,
    },
  });
}

/**
 * Checks database for user existance.
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

authenticator.use(
  new FormStrategy(async ({ form }) => {
    try {
      const type = form.get('type') as string;

      const username = form.get('username') as string;
      const password = form.get('password') as string;
      const passwordConfirmation = form.get('passwordConfirmation') as string;

      let user = null;

      switch (type) {
        case 'login':
          {
            loginSchema.parse({ username, password });

            user = await login({ username, password });

            if (!user) {
              return badRequest({
                fieldErrors: {
                  username: `No user with that username exists.`,
                },
              });
            }

            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            );

            if (!isPasswordCorrect) {
              return badRequest({
                fieldErrors: {
                  password: `The password you provided doesn't match.`,
                },
              });
            }
          }
          break;
        case 'register':
          {
            registerSchema.parse({ username, password, passwordConfirmation });

            const existingUser = await db.user.findFirst({
              where: { username },
            });

            if (existingUser) {
              return badRequest({
                fieldErrors: {
                  username: `This username is already taken.`,
                },
              });
            }

            user = await register({ username, password });
          }
          break;
        default:
          break;
      }

      if (user) {
        return await createUserSession({ user });
      }

      return badRequest({
        formError: 'Something went wrong, try again in a moment.',
      });
    } catch (error) {
      const errors = (error as z.ZodError).flatten();

      return badRequest({
        fieldErrors: {
          username: errors.fieldErrors.username?.[0],
          password: errors.fieldErrors.password?.[0],
          passwordConfirmation: errors.fieldErrors.passwordConfirmation?.[0],
        },
      });
    }
  })
);
