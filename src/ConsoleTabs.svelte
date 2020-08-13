<script>
  import { fade } from "svelte/transition";

  export let focusedOption = "SELECTION";
  $: isExpanded = focusedOption != "NONE";

  function setFocusedOption(option) {
    focusedOption = option;
  }
</script>

<div class="flex items-center justify-between">
  <div class="flex items-center">
    <button
      on:click={() => (focusedOption === 'SELECTION' ? setFocusedOption('NONE') : setFocusedOption('SELECTION'))}
      class={`${focusedOption == 'SELECTION' ? 'text-blue-600  focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-500  hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} flex flex-col items-center justify-center p-3 text-xl font-medium border group focus:outline-none rounded-lg`}>
      <svg
        class={`${focusedOption == 'SELECTION' ? 'text-blue-600 focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600'} w-8 h-8`}
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122
          2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
      <span>Inspect</span>
    </button>
  </div>
  {#if isExpanded}
    <button
      transition:fade
      on:click={() => setFocusedOption('NONE')}
      class={`text-blue-500 transition duration-150 ease-in-out border border-transparent rounded-md outline-none focus:border-blue-700 focus:shadow-outline-blue focus:outline-none`}>
      hide
    </button>
  {/if}
</div>
