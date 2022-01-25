import { json } from 'remix';

/**
 * Returns bad response with 400 status code.
 *
 * @param {Object} data - generic data object.
 * @returns `Response` - https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
export function badRequest<T>(data: T) {
  return json(data, { status: 400 });
}
