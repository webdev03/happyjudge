import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ params, locals }) => {
  const { id } = params;

  const problem = await db.query.problem.findFirst({
    where: eq(table.problem.id, id),
  });

  if (!problem) error(404, 'Not found');

  // TODO: Permissions

  return { problem };
};
