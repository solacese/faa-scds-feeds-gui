import { writable } from "svelte/store";
import { createMachine } from "@xstate/fsm";
import { useMachine } from "./useMachine";

// feed caches
export const fdpsFeedCache = writable({});

// Google Maps
export const mapCurrentSelection = writable(null);
export const filters = writable(new Map());
export const markers = writable({});
export const markerCluster = writable(null);
export const mapUpdateBatch = writable({ add: [], remove: [] });

// UI state machines
export const connectMachine = writable(
  useMachine(
    createMachine({
      id: "connectMachine",
      initial: "disconnected",
      states: {
        disconnected: {
          on: {
            CONNECT_REQUEST: "connecting",
          },
        },
        connecting: {
          on: {
            UP_NOTICE: "connected",
            ERROR: "error",
          },
        },
        connected: {
          on: {
            DISCONNECTED: "disconnected",
          },
        },
        error: {
          on: {
            CONNECT_REQUEST: "connecting",
          },
        },
      },
    })
  )
);
