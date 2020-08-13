<script>
  import { slide } from "svelte/transition";
  import ConsoleTabs from "./ConsoleTabs.svelte";
  import ConsoleSelectionPanel from "./ConsoleSelectionPanel.svelte";

  export let focusedOption = "SELECTION";
  $: isExpanded = focusedOption != "NONE";
</script>

<div class="p-4 overflow-hidden bg-white rounded-lg shadow">
  <ConsoleTabs bind:focusedOption />
  {#if isExpanded}
    <div transition:slide={{ duration: 500 }} class="w-full mt-4 lg:h-72 h-28rem">
      {#if focusedOption == 'SELECTION'}
        <ConsoleSelectionPanel />
      {/if}
    </div>
  {/if}
</div>
