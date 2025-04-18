import { pgTable, pgEnum, text, timestamp, integer, serial, jsonb, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard', 'expert', 'insane']);

export const problem = pgTable('problem', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  statement: text('statement').notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  timeLimit: integer('time_limit').notNull(), // in milliseconds
  memoryLimit: integer('memory_limit').notNull(), // in megabytes
  sampleTestcases: jsonb('sample_testcases').notNull().$type<{ input: string; output: string }[]>(),
  authorId: text('author_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  // TODO: One to many access (first TODO groups)
  tags: jsonb('tags').$type<string[]>().notNull(),
});

export const testcase = pgTable('testcase', {
  id: serial('id').primaryKey(),
  problemId: text('problem_id')
    .notNull()
    .references(() => problem.id),
  input: text('input').notNull(),
  output: text('output').notNull(),
  isHidden: boolean('is_hidden').default(true).notNull(),
  weight: integer('weight').default(1).notNull(), // partial scoring
});

export const verdictEnum = pgEnum('verdict', [
  'accepted',
  'wrong_answer',
  'time_limit_exceeded',
  'memory_limit_exceeded',
  'runtime_error',
  'compilation_error',
  'waiting',
  'processing',
]);

// TODO: Submission

// TODO: Group

// TODO: Contest

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type DifficultyEnum = typeof difficultyEnum.enumValues;

export type Problem = typeof problem.$inferSelect;

export type Testcase = typeof testcase.$inferSelect;

export type VerdictEnum = typeof verdictEnum.enumValues;
