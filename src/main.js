import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    googleMapsLoaded: false,
  },
});

window.initMap = function googleMapsLoaded() {
  app.$set({ googleMapsLoaded: true });
};

export default app;
