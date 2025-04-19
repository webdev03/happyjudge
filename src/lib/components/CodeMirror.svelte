<script lang="ts">
  import { onMount } from 'svelte';

  import { EditorView, basicSetup } from 'codemirror';
  import { EditorState } from '@codemirror/state';
  import { defaultKeymap } from '@codemirror/commands';

  let { value = $bindable(''), readOnly = false } = $props();

  let divEl: HTMLDivElement;

  onMount(() => {
    let startState = EditorState.create({
      doc: value,
      extensions: [basicSetup, EditorState.readOnly.of(readOnly)],
    });

    let view = new EditorView({
      state: startState,
      parent: divEl,
    });
  });
</script>

<div bind:this={divEl}></div>
