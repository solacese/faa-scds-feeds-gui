<script>
  import { slide } from "svelte/transition";
  import ConsoleSubscriptionManager from "./ConsoleSubscriptionManager.svelte";
  import ConsoleTabs from "./ConsoleTabs.svelte";
  import ConsoleSelectionPanel from "./ConsoleSelectionPanel.svelte";
  import ConsoleKdbPanel from "./ConsoleKdbPanel.svelte";

  export let isExpanded = true;
  export let focusedOption = "SELECTION";
</script>

<ConsoleSubscriptionManager />

<div class="p-4 overflow-hidden bg-white rounded-lg shadow sm:p-6">
  <ConsoleTabs bind:focusedOption bind:isExpanded />
  {#if isExpanded}
    <div transition:slide class="w-full mt-4 h-72">
      {#if focusedOption == 'SELECTION'}
        <ConsoleSelectionPanel />
      {:else if focusedOption == 'KDB'}
        <ConsoleKdbPanel />
      {/if}
    </div>
  {/if}
</div>
