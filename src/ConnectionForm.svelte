<script>
  import { getContext } from "svelte";
  import { connectMachine } from "./stores";
  import { createSolaceClient, solaceContextKey } from "./solace-client";
  import ConnectionSpinner from "./ConnectionSpinner.svelte";

  const { state, send } = $connectMachine;

  const { getSolaceClient } = getContext(solaceContextKey);
  let solaceClient = getSolaceClient();

  let url = "wss://swim.messaging.solace.cloud:443";
  let vpnName = "scds";
  let userName = "solace-cloud-client";
  let password = "djism9m131tv04o0qlvmg6bjo0";

  async function handleConnect() {
    let _solaceClient = createSolaceClient({
      url,
      vpnName,
      userName,
      password,
    });
    _solaceClient.setOnUpNotice(() => {
      send("UP_NOTICE");
    });
    _solaceClient.setOnConnectFailedError(() => {
      send("ERROR");
    });
    _solaceClient.setOnDisconnected(() => {
      send("DISCONNECTED");
    });

    send("CONNECT_REQUEST");
    $solaceClient = await _solaceClient.connect();
  }

  async function handleDisconnect() {
    if ($solaceClient) {
      $solaceClient.disconnect();
      $solaceClient = null;
    }
  }
</script>

<!-- header -->
<div class="flex items-center justify-between">
  <h2 class="text-xl text-gray-900 sm:text-2xl">Establish connection to Solace</h2>
  {#if $state.value == "connected"}
    <span class="h-6 ml-2">
      <svg
        class="h-full"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          class="text-green-500 stroke-current"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0
          00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    </span>
  {:else}
    <span class="h-6 ml-2">
      <svg
        class="h-full text-red-500"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  {/if}
</div>

<!-- connection details -->
<div class="mt-2">
  <div>
    <label for="brokerUrl" class="block text-sm font-medium leading-5 text-gray-700">Broker URL</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input id="brokerUrl" class="block w-full form-input sm:text-sm sm:leading-5" placeholder="" bind:value={url} />
    </div>
  </div>
  <div class="mt-2">
    <label for="messageVpn" class="block text-sm font-medium leading-5 text-gray-700">Message VPN</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        id="messageVpn"
        class="block w-full form-input sm:text-sm sm:leading-5"
        placeholder=""
        bind:value={vpnName}
      />
    </div>
  </div>
  <div class="mt-2">
    <label for="clientUsername" class="block text-sm font-medium leading-5 text-gray-700">Client Username</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        id="clientUsername"
        class="block w-full form-input sm:text-sm sm:leading-5"
        placeholder=""
        bind:value={userName}
      />
    </div>
  </div>
  <div class="mt-2">
    <label for="clientPassword" class="block text-sm font-medium leading-5 text-gray-700">Client Password</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        id="clientPassword"
        class="block w-full form-input sm:text-sm sm:leading-5"
        type="password"
        placeholder=""
        bind:value={password}
      />
    </div>
  </div>
</div>

<!-- buttons -->
<div class="flex items-center mt-4">
  <div class="mr-2">
    <button
      on:click={handleConnect}
      type="button"
      disabled={$state.value == "connected"}
      class={`inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 ${
        $state.value == "connected" ? "cursor-not-allowed" : ""
      }`}
    >
      Connect
    </button>
  </div>
  <div class="mr-2">
    <button
      on:click={handleDisconnect}
      type="button"
      disabled={$state.value == "disconnected"}
      class={`inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 ${
        $state.value == "disconnected" ? "cursor-not-allowed" : ""
      }`}
    >
      Disconnect
    </button>
  </div>
  {#if $state.value == "connecting"}
    <div class="mr-2">
      <ConnectionSpinner />
    </div>
  {/if}
</div>
