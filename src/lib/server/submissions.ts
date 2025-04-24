import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import PQueue from 'p-queue';
import { execute } from './codefort';

const queue = new PQueue({
  concurrency: 1, // Only one execution at a time!
  autoStart: true,
});

async function executeTestcases(submission: table.Submission, problem: table.Problem) {
  const testcases = await db.query.testcase.findMany({
    where: eq(table.testcase.problemId, problem.id),
  });
  let results: table.Result[] = [];
  queue.start();
  await queue.addAll(
    testcases.map((testcase) => async () => {
      const result = await execute(
        submission.language,
        submission.code,
        testcase.input,
        4000, // reasonable compile time limit?
        problem.memoryLimit,
        problem.timeLimit,
        problem.memoryLimit,
      );

      const outputMatches =
        result.stdout
          .split('\n')
          .map((x) => x.trim())
          .join('')
          .trim() ===
        testcase.output
          .split('\n')
          .map((x) => x.trim())
          .join('')
          .trim();

      results.push({
        id: testcase.id,
        caseGroup: testcase.caseGroup,
        memoryUsed: 0, // TODO
        output: result.stdout,
        timeTaken: result.stats.run.realTime,
        // TODO: fix this
        verdict: outputMatches
          ? 'accepted'
          : result.exitCode !== 0
            ? 'runtime_error'
            : result.stats.run.realTime >= problem.timeLimit
              ? 'time_limit_exceeded'
              : 'wrong_answer',
        // TODO: also fix this
        score: outputMatches ? testcase.weight : 0,
      });

      // TODO: socket.io broadcast
    }),
  );
  await db
    .update(table.submission)
    .set({
      results,
    })
    .where(eq(table.submission.id, submission.id));
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

  executeTestcases(submission, problem);

  return submission;
}
