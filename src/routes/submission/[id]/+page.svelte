<script lang="ts">
  let { data } = $props();
</script>

<h1 class="text-3xl font-semibold">
  Submission to <a href={'/problem/' + data.submission.problem.id} class="italic">{data.submission.problem.title}</a>
</h1>
