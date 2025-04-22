import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { languages } from '$lib/server/codefort';
import createSubmission from '$lib/server/submissions';
import { assertUserExists } from '$lib/server/assertion';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;

  const problem = await db.query.problem.findFirst({
    where: eq(table.problem.id, id),
  });

  if (!problem) error(404, 'Not found');

  // TODO: Permissions

  return { problem, languages };
};

export const actions = {
  submit: async ({ params, request, locals }) => {
    assertUserExists(locals.auth);

    const data = await request.formData();

    const language = data.get('lang')?.toString();
    const code = data.get('code')?.toString();

    if (!language || !languages.find((x) => x.id === language)) error(400, 'Invalid language');
    if (!code) error(400, 'No code provided');

    const submission = await createSubmission(language, code, params.id, locals.auth.user.id);

    return redirect(303, '/submission/' + submission.id);
  },
} satisfies Actions;
