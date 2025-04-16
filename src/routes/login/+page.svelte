<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<h1>Login/Register</h1>
<p>If you don't have an account yet, filling this form and clicking on Register will create one for you.</p>
<form method="post" action="?/login" use:enhance>
  <label>
    Username
    <input name="username" />
  </label>
  <label>
    Password
    <input type="password" name="password" />
  </label>
  <button>Login</button>
  <button formaction="?/register">Register</button>
</form>
<p class="text-red-400">{form?.message ?? ''}</p>
