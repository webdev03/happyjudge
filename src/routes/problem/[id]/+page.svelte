<script lang="ts">
  import Difficulty from '$lib/components/Difficulty.svelte';
  import CodeMirror from '$lib/components/CodeMirror.svelte';
  import { parseMarkdown } from '$lib/markdown';

  let { data } = $props();

  let code = $state('');
</script>

<div class="flex items-center space-x-8">
  <h1 class="text-3xl font-semibold">{data.problem.title}</h1>
  <Difficulty difficulty={data.problem.difficulty} />
</div>
<div class="my-1">
  <p>Time limit: {data.problem.timeLimit}ms</p>
  <p>Memory limit: {data.problem.memoryLimit}mb</p>
</div>
<div class="my-2 h-[2px] w-full rounded-full bg-gray-700"></div>
<div>{@html parseMarkdown(data.problem.statement)}</div>
<div class="my-2 h-[2px] w-full rounded-full bg-gray-700"></div>
{#if data.problem.sampleTestcases.length > 0}
  <h2 class="my-2 text-2xl font-semibold">Sample Testcases</h2>
  {#each data.problem.sampleTestcases as sampleTestcase, i}
    <h2 class="mt-2 text-xl font-semibold">Sample #{i + 1}</h2>
    <div class="flex">
      <div class="flex w-[50%] flex-col p-1">
        <h4 class="my-1 text-lg">Input:</h4>
        <CodeMirror value={sampleTestcase.input} readOnly={true} />
      </div>
      <div class="flex w-[50%] flex-col p-1">
        <h4 class="my-1 text-lg">Output:</h4>
        <CodeMirror value={sampleTestcase.output} readOnly={true} />
      </div>
    </div>
  {/each}
{/if}
<div class="my-2 h-[2px] w-full rounded-full bg-gray-700"></div>
<h2 class="my-2 text-2xl font-semibold">Submit</h2>
<!-- TODO: INTEGRATE WITH CODEFORT

<label for="lang">Choose a language:</label>
<br />
<select name="lang" id="lang" class="mb-3">
  <option value="java">JavaScript (v8 10.1)</option>
  <option value="saab">C++ 17 (gcc 15)</option>
  <option value="mercedes">Bash</option>
</select>
 -->
<p>Enter code here:</p>
<CodeMirror bind:value={code} />
<button
  class="my-4 flex w-72 cursor-pointer justify-center rounded-md bg-sky-500 px-3 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
  >Submit</button
>
