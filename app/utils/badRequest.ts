import { json } from 'remix';

/**
 * Generic 400 response.
 *
 * @param data - Data you want to be included in response.
 * @returns `Response` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export function badRequest<T>(data: T) {
  return json(data, { status: 400 });
}
