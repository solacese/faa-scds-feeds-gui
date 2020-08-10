<script>
  export let focusedOption = "SELECTION";
  export let isExpanded = true;

  function setFocusedOption(option) {
    focusedOption = option;
  }

  function toggleIsExpanded() {
    isExpanded = !isExpanded;
  }
</script>

<div class="flex items-center justify-between">
  <div class="flex items-center">
    <button
      on:click={() => setFocusedOption('SELECTION')}
      class={`${focusedOption == 'SELECTION' ? 'text-blue-600  focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-500  hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} inline-flex items-center px-1 py-4 text-sm font-medium leading-5 border-b-2 border-transparent group focus:outline-none`}>
      <svg
        class={`${focusedOption == 'SELECTION' ? 'text-blue-600 focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600'} -ml-0.5 mr-2 h-5 w-5`}
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
      <span>Selection</span>
    </button>
    <button
      on:click={() => setFocusedOption('KDB')}
      class={`${focusedOption == 'KDB' ? 'text-blue-600  focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-500  hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} inline-flex items-center px-1 py-4 text-sm font-medium leading-5 border-b-2 border-transparent group focus:outline-none ml-2`}>
      <svg
        class={`${focusedOption == 'KDB' ? 'text-blue-600 focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600'} -ml-0.5 mr-2 h-5 w-5`}
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2
          2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <span>kdb+</span>
    </button>
  </div>
  {#if isExpanded}
    <button
      on:click={toggleIsExpanded}
      class={`text-blue-500 transition duration-150 ease-in-out border border-transparent rounded-md outline-none focus:border-blue-700 focus:shadow-outline-blue focus:outline-none`}>
      hide
    </button>
  {:else}
    <button
      on:click={toggleIsExpanded}
      class={`text-blue-500 transition duration-150 ease-in-out border border-transparent rounded-md outline-none focus:border-blue-700 focus:shadow-outline-blue focus:outline-none`}>
      show
    </button>
  {/if}
</div>
