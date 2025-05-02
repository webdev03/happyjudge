import { assertUserExists } from '$lib/server/assertion';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  assertUserExists(event.locals.auth);
  if (!event.locals.auth.user.canCreate) error(403);

  return {};
};
