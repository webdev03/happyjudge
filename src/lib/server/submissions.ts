import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import PQueue from 'p-queue';
import { execute } from './codefort';

const queue = new PQueue({
  concurrency: 1, // Only one execution at a time!
  autoStart: true,
});

async function executeTestcases(language: string, code: string, problem: table.Problem) {
  const testcases = await db.query.testcase.findMany({
    where: eq(table.testcase.problemId, problem.id),
  });
  let results: table.Result[] = [];
  await queue.addAll(
    testcases.map((testcase) => async () => {
      const result = await execute(
        language,
        code,
        testcase.input,
        4000, // reasonable compile time limit?
        problem.memoryLimit,
        problem.timeLimit,
        problem.memoryLimit,
      );
      results.push({
        id: testcase.id,
        memoryUsed: 0, // TODO
        output: result.stdout,
        timeTaken: result.stats.run.realTime,
        // TODO: fix this
        verdict:
          result.stdout
            .split('\n')
            .map((x) => x.trim())
            .join('')
            .trim() ===
          testcase.output
            .split('\n')
            .map((x) => x.trim())
            .join('')
            .trim()
            ? 'accepted'
            : result.exitCode !== 0
              ? 'runtime_error'
              : result.stats.run.realTime >= problem.timeLimit
                ? 'time_limit_exceeded'
                : 'wrong_answer',
        // TODO: also fix this
        score:
          result.stdout
            .split('\n')
            .map((x) => x.trim())
            .join('')
            .trim() ===
          testcase.output
            .split('\n')
            .map((x) => x.trim())
            .join('')
            .trim()
            ? testcase.weight
            : 0,
      });
    }),
  );
}

export default async function createSubmission(language: string, code: string, problemId: string, userId: string) {
  const problem = await db.query.problem.findFirst({
    where: eq(table.problem.id, problemId),
  });
  if (!problem) throw Error('Problem not found');

  const submission = (
    await db
      .insert(table.submission)
      .values({
        problemId: problem.id,
        language,
        code,
        userId,
      })
      .returning()
  )[0];

  executeTestcases(language, code, problem);

  return submission;
}
