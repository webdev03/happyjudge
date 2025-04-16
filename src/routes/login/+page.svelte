<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<h1 class="my-1 text-2xl font-bold">Login/Register</h1>
<form class="mt-2 space-y-4" method="post" action="?/login" use:enhance>
  <label>
    <span class="my-2 block text-sm font-medium">Username</span>
    <input
      name="username"
      required
      class="block w-96 rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-200 sm:text-sm"
    />
  </label>
  <label>
    <span class="my-2 block text-sm font-medium">Password</span>
    <input
      type="password"
      name="password"
      required
      class="block w-96 rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-200 sm:text-sm"
    />
  </label>
  <button
    class="my-4 flex w-96 cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >Login</button
  >
  <span class="block w-96 text-center">or</span>
  <button
    class="my-4 flex w-96 cursor-pointer justify-center rounded-md bg-sky-400 px-3 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
    formaction="?/register">Register new account</button
  >
</form>
<p class="text-red-400">{form?.message ?? ''}</p>
