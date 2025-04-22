import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.auth.user) {
    return redirect(302, '/login');
  }
  return { user: locals.auth.user };
};

export const actions: Actions = {
  // This is here because the action cannot go in the layout.server.ts file
  logout: async (event) => {
    if (!event.locals.auth.session) {
      return fail(401);
    }
    await auth.invalidateSession(event.locals.auth.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, '/login');
  },
};
