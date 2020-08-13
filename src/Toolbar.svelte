<script>
  import { fade } from "svelte/transition";
  import SvgAirplane from "./SvgAirplane.svelte";
  import ConnectionForm from "./ConnectionForm.svelte";

  let focusedOption = "CONNECTION";

  function setFocusedOption(option) {
    focusedOption = option;
  }
</script>

<div class="flex flex-col p-4 overflow-hidden bg-white rounded-lg shadow-md lg:flex-row lg:h-full">
  <!-- toolbar -->
  <div class="flex flex-row items-center lg:w-30 lg:flex-col lg:h-full">
    <!-- brand logo -->
    <div class="w-20">
      <SvgAirplane />
    </div>

    <!-- spacer-4 lg:spacer-6 -->
    <div class="w-4 h-4 lg:w-6 lg:h-6" />
    <!-- /spacer-4 -->

    <!-- buttons -->
    <button
      on:click={() => (focusedOption === 'CONNECTION' ? setFocusedOption('NONE') : setFocusedOption('CONNECTION'))}
      class={`${focusedOption == 'CONNECTION' ? 'text-blue-600  focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-500  hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} flex flex-col items-center justify-center p-3 text-xl font-medium border group focus:outline-none rounded-lg`}>
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        class={`${focusedOption == 'CONNECTION' ? 'text-blue-600 focus:text-blue-800 focus:border-blue-700 border-blue-500' : 'text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600'} w-8 h-8`}>
        <path
          d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5
          6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0
          00-1.414-1.414L15 13.586V8z" />
      </svg>
      <span>Connect</span>
    </button>
  </div>

  <!-- toolbar content-->
  <div
    class={`w-full transition-all duration-300 ease-linear transform ${focusedOption === 'NONE' ? 'lg:w-0 h-0' : 'lg:w-96 h-28rem'}`}>
    <!-- connection panel -->
    {#if focusedOption == 'CONNECTION'}
      <div class="flex items-center justify-end flex-grow">
        <button
          transition:fade={{ duration: 200 }}
          on:click={() => (focusedOption === 'CONNECTION' ? setFocusedOption('NONE') : setFocusedOption('CONNECTION'))}
          class={`text-blue-500 transition duration-150 ease-in-out border border-transparent rounded-md outline-none focus:border-blue-700 focus:shadow-outline-blue focus:outline-none`}>
          hide
        </button>
      </div>
      <div transition:fade class="flex-shrink-0 p-2 lg:p-4 min-w-max-content">
        <ConnectionForm />
      </div>
    {/if}
  </div>
</div>
