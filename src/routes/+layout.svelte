<script lang="ts">
  import '../app.css';

  let { data, children } = $props();
</script>

<div class="p-3">
  <nav class="flex flex-col rounded-2xl border-2 border-gray-100 p-4 shadow-md">
    <a href="/" class="font-mono"><span class="font-bold">happy</span>judge</a>
  </nav>

  <main class="p-2">
    {@render children()}
  </main>
</div>
