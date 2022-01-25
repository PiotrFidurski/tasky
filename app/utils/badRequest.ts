import { json } from 'remix';

export function badRequest<T>(data: T) {
  return json(data, { status: 400 });
}
