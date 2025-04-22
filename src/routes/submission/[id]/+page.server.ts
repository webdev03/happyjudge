import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { assertUserExists } from '$lib/server/assertion';

export const load: PageServerLoad = async ({ params, locals }) => {
  assertUserExists(locals.auth);

  const { id } = params;

  const submission = await db.query.submission.findFirst({
    where: eq(table.submission.id, Number(id)),
    with: {
      problem: true,
    },
  });

  if (!submission) error(404, 'Not found');
  if (submission.userId !== locals.auth.user.id) error(404, 'Not found');

  return { submission };
};
