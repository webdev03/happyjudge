<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>Home - happyjudge</title>
</svelte:head>

<h1 class="text-2xl">Hi, {data.user.username}!</h1>
<p>TODO: actual stuff</p>
