<script lang="ts">
  import '../app.css';
  import { enhance } from '$app/forms';

  let { data, children } = $props();
</script>

<div class="p-3">
  <nav class="mb-1 flex items-center rounded-2xl border-2 border-gray-100 px-4 py-3 shadow-md">
    <a href="/" class="flex font-mono"><span class="font-bold">happy</span>judge</a>
    <div class="ml-auto flex">
      <!-- checks if user is logged in -->
      {#if data.user}
        <form method="post" action="/?/logout" use:enhance>
          <button
            class="w-24 cursor-pointer justify-center rounded-xl bg-sky-500 px-2 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >Sign out</button
          >
        </form>
      {/if}
    </div>
  </nav>

  <main class="p-2">
    {@render children()}
  </main>
</div>
