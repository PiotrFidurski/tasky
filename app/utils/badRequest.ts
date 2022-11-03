import { json } from 'remix';

/**
 * Generic 4xx response.
 *
 * @param data - Data you want to be included in response.
 * @returns `Response` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export function badRequest<T>(data: T, statusCode?: 403 | 404 | 500 | 504) {
  return json(data, { status: statusCode ?? 400 });
}
