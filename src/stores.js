import { writable } from "svelte/store";

// toggles
export const activeFeeds = writable({});
export const activeAirlines = writable({});

// feed caches
export const fdpsFeedCache = writable({});
export const distanceStatsCache = writable([]);

// Google Maps
export const filters = writable(new Map());
export const markers = writable({});
export const markerCluster = writable(null);
export const mapUpdateBatch = writable({ add: [], remove: [] });
