<script>
  import DistanceList from "./DistanceList.svelte";

  export let focusedOption = "DISTANCE";

  function setFocusedOption(option) {
    focusedOption = option;
  }
</script>

<div class="flex h-full">
  <div class="grid w-1/4 h-full grid-cols-2 grid-rows-2 gap-2">
    <button
      on:click={() => setFocusedOption('DISTANCE')}
      class={`${focusedOption == 'DISTANCE' ? 'text-blue-600  focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-500  hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} flex items-center justify-center p-4 text-xl font-medium border  group focus:outline-none w-full h-full rounded-lg`}>
      <svg
        class={`${focusedOption == 'DISTANCE' ? 'text-blue-600 focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600'} -ml-0.5 mr-2 h-5 w-5`}
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0
          104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>Distance</span>
    </button>
    <button
      on:click={() => setFocusedOption('KDB')}
      class={`${focusedOption == 'KDB' ? 'text-blue-600  focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-500  hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} flex items-center justify-center p-4 text-xl font-medium border  group focus:outline-none w-full h-full rounded-lg`}>
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
      <span>Stat 2</span>
    </button>
    <button
      on:click={() => setFocusedOption('KDB')}
      class={`${focusedOption == 'KDB' ? 'text-blue-600  focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-500  hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} flex items-center justify-center p-4 text-xl font-medium border  group focus:outline-none w-full h-full rounded-lg`}>
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
      <span>Stat 3</span>
    </button>
    <button
      on:click={() => setFocusedOption('KDB')}
      class={`${focusedOption == 'KDB' ? 'text-blue-600  focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-500  hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} flex items-center justify-center p-4 text-xl font-medium border  group focus:outline-none w-full h-full rounded-lg`}>
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
      <span>Stat 4</span>
    </button>
  </div>
  <div class="w-3/4 h-full ml-4 border rounded-lg">
    {#if focusedOption == 'DISTANCE'}
      <DistanceList />
    {/if}
  </div>
</div>
