<script lang="ts">
  import type { DifficultyEnum } from '$lib/server/db/schema';

  let { difficulty }: { difficulty: DifficultyEnum[number] } = $props();
</script>

<span
  class={'flex h-8 items-center justify-center rounded-full px-6 py-2 text-center shadow-sm ' +
    (difficulty === 'easy'
      ? 'bg-green-400'
      : difficulty === 'medium'
        ? 'bg-yellow-400'
        : difficulty === 'hard'
          ? 'bg-red-400'
          : difficulty === 'expert'
            ? 'bg-red-600 text-white'
            : 'bg-red-800 text-white')}>{difficulty}</span
>
