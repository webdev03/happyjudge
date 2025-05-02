<script lang="ts">
  import CodeMirror from '$lib/components/CodeMirror.svelte';

  let { data } = $props();

  let groups: string[] = [...new Set(data.submission.results.map((x) => x.caseGroup))]; // de-duplication

  let results = groups.map((g) => ({
    groupId: g,
    results: data.submission.results.filter((x) => x.caseGroup === g),
    passed:
      data.submission.results.filter((x) => x.caseGroup === g).filter((x) => x.verdict !== 'Accepted').length === 0, // nobody wasn't accepted, so everyone was
  }));
</script>

<!-- TODO: Show non-hidden output -->

<svelte:head>
  <title>Submission to "{data.submission.problem.title}" - happyjudge</title>
</svelte:head>

<h1 class="mb-3 text-3xl font-semibold">
  Submission to <a href={'/problem/' + data.submission.problem.id} class="italic">{data.submission.problem.title}</a>
</h1>

<div class="mb-3">
  <p><span class="font-bold">Language:</span> {data.submission.language}</p>
</div>

<!-- based on https://flowbite.com/docs/components/tables/ -->
<table class="w-full table-auto rounded border-4 border-gray-200 text-left text-sm">
  <thead class="bg-gray-50 text-xs text-gray-700 uppercase">
    <tr>
      <th scope="col" class="w-24"></th>
      <th scope="col" class="w-48"></th>
      <th scope="col" class="px-6 py-3"> Time taken </th>
      <!-- <th scope="col" class="px-6 py-3"> Memory used </th> -->
      <th scope="col" class="px-6 py-3"> Verdict </th>
      <th scope="col" class="px-6 py-3"> Score </th>
    </tr>
  </thead>
  {#each results as group, i}
    <tbody class={group.passed ? 'bg-green-400' : 'bg-red-400'}>
      <tr class="border-b border-white">
        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-gray-900">{group.groupId}</th>
        <th scope="row" class="px-6 py-3"></th>
        <th scope="row" class="px-6 py-3"></th>
        <th scope="row" class="px-6 py-3"></th>
        <th scope="row" class="px-6 py-3"
          >+{(group.passed ? group.results.map((x) => x.score).reduce((a, b) => a + b, 0) : 0).toFixed(2)}</th
        >
      </tr>
    </tbody>
    <tbody class="border-b-8 border-white">
      {#each group.results as caseResult, j}
        <tr class={'border-b border-gray-200 ' + (caseResult.verdict === 'Accepted' ? 'bg-green-400' : 'bg-red-400')}>
          <th></th>
          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-gray-900">
            Case {group.groupId}.{j + 1}
          </th>
          <td class="px-6 py-4"> {(caseResult.timeTaken / 1000).toFixed(3)} seconds </td>
          <!-- <td class="px-6 py-4"> Laptop </td> -->
          <td class="px-6 py-4"> {caseResult.verdict} </td>
          <td class="px-6 py-4"> {caseResult.verdict === 'Accepted' && group.passed ? caseResult.score : 0} </td>
        </tr>
      {/each}
    </tbody>
  {/each}
  <tbody class="bg-gray-50 text-xs text-gray-700 uppercase">
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="px-6 py-4"
        >Total Score: {results
          .map((x) => (x.passed ? x.results.map((y) => y.score).reduce((a, b) => a + b, 0) : 0))
          .reduce((a, b) => a + b, 0)}</td
      >
    </tr>
  </tbody>
</table>

<h2 class="my-3 text-2xl font-semibold">Code</h2>
<p class="my-3">Written in {data.submission.language}</p>
<CodeMirror value={data.submission.code} basicEditSetup={false} readOnly={true} />
