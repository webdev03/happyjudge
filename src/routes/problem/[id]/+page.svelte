<script lang="ts">
  import { enhance } from '$app/forms';

  import Difficulty from '$lib/components/Difficulty.svelte';
  import CodeMirror from '$lib/components/CodeMirror.svelte';
  import { parseMarkdown } from '$lib/markdown';

  let { data } = $props();

  let code = $state('');
</script>

<svelte:head>
  <title>{data.problem.title} - happyjudge</title>
</svelte:head>

<div class="flex items-center space-x-8">
  <h1 class="text-3xl font-semibold">{data.problem.title}</h1>
  <Difficulty difficulty={data.problem.difficulty} />
</div>
<div class="my-1">
  <p>Time limit: {data.problem.timeLimit}ms</p>
  <p>Memory limit: {data.problem.memoryLimit}mb</p>
</div>
<div class="my-2 h-[2px] w-full rounded-full bg-gray-700"></div>
<article class="prose max-w-none">{@html parseMarkdown(data.problem.statement)}</article>
<div class="my-2 h-[2px] w-full rounded-full bg-gray-700"></div>
{#if data.problem.sampleTestcases.length > 0}
  <h2 class="my-2 text-2xl font-semibold">Sample Testcases</h2>
  {#each data.problem.sampleTestcases as sampleTestcase, i}
    <h2 class="mt-2 text-xl font-semibold">Sample #{i + 1}</h2>
    <div class="flex space-x-2">
      <div class="flex w-[50%] flex-col">
        <h4 class="my-1 text-lg">Input:</h4>
        <div class="border"><CodeMirror value={sampleTestcase.input} basicEditSetup={false} readOnly={true} /></div>
      </div>
      <div class="flex w-[50%] flex-col">
        <h4 class="my-1 text-lg">Output:</h4>
        <div class="border"><CodeMirror value={sampleTestcase.output} basicEditSetup={false} readOnly={true} /></div>
      </div>
    </div>
  {/each}
{/if}
<div class="my-2 h-[2px] w-full rounded-full bg-gray-700"></div>
<form method="POST" action="?/submit">
  <h2 class="my-2 text-2xl font-semibold">Submit</h2>
  <label for="lang">Choose a language:</label>
  <br />
  <select name="lang" id="lang" class="mb-3">
    {#each data.languages as language}
      <option value={language.id}>{language.name}</option>
    {/each}
  </select>
  <p>Enter code here:</p>
  <CodeMirror bind:value={code} />
  <!-- for the form submission -->
  <textarea id="code" name="code" bind:value={code} class="hidden"></textarea>
  <button
    class="my-4 flex w-72 cursor-pointer justify-center rounded-md bg-sky-500 px-3 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
    >Submit</button
  >
</form>
