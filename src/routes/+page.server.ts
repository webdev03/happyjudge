import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.auth.user) {
    return redirect(302, '/login');
  }

  const problems = await db.query.problem.findMany({
    where: eq(table.problem.homepage, true),
    limit: 80, // only 80 at once
  });

  return { user: locals.auth.user, problems };
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
