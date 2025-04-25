<script lang="ts">
  import type { PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>Home - happyjudge</title>
</svelte:head>

<h1 class="mb-2 text-2xl">Hi, {data.user.username}!</h1>

<h3 class="mb-2 text-xl">Recommended problems for you</h3>
<!-- Recommendation system -->

<div class="grid grid-cols-2 space-y-2 space-x-2 md:grid-cols-4">
  {#each data.problems as problem}
    <a href={`/problem/${problem.id}`} class="block"
      ><div class="flex flex-col space-y-2 rounded bg-gray-200 p-3">
        <h3 class="text-lg font-semibold">
          {problem.title}
        </h3>
        {#if problem.tags.length > 0}
          <div>
            <p class="my-1">Tags:</p>
            <div class="flex">
              {#each problem.tags as tag}
                <span class="flex h-8 min-w-12 items-center justify-center rounded-full bg-blue-400 p-3 text-center"
                  >{tag}</span
                >
              {/each}
            </div>
          </div>
        {/if}
      </div></a
    >
  {:else}
    <p class="italic">The admin hasn't added any problems to the homepage yet! :O</p>
  {/each}
</div>
