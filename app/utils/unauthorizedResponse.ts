import { json } from 'remix';

export function unauthorizedResponse(message: string) {
  return json({ error: message }, { status: 401, statusText: 'Unauthorized' });
}
