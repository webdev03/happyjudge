import type { Verdict } from './server/db/schema';

export function verdictToHumanName(verdict: Verdict) {
  if (verdict === 'accepted') return 'Accepted' as const;
  if (verdict === 'compilation_error') return 'Compilation Error' as const;
  if (verdict === 'memory_limit_exceeded') return 'Memory Limit Exceeded' as const;
  if (verdict === 'runtime_error') return 'Runtime Error' as const;
  if (verdict === 'time_limit_exceeded') return 'Time Limit Exceeded' as const;
  if (verdict === 'wrong_answer') return 'Wrong Answer' as const;
}
