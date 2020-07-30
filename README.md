[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) ![Build and Deploy](https://github.com/solacese/faa-scds-feeds-gui/workflows/Build%20and%20Deploy/badge.svg)

# FAA SCDS Feeds GUI

A browser application that implements a geo-filtering algorithm to dynamically generate topic subscriptions that attract pre-filtered sets of streaming GPS data from SCDS feeds.

[SWIM Feed Handler](https://github.com/solacese/swim-feed-handler) is the producer of the data this GUI is displaying. It's an application designed to relay messages from the FAA's publicly available US System Wide Information Management (SWIM) data feeds to a Solace PubSub+ Event Broker. The GitHub repository includes a thorough overview of the steps required to sign up for SCDS data and to run the application locally.

## Public URL

[https://solace-scds-feeds-gui.netlify.app/](https://solace-scds-feeds-gui.netlify.app/)

## Branch structure

- master: source code for the site hosted at the above public URL
- kdb-stats: includes a panel to display stats produced by an accompanying project, [scds-solace-kdb](https://github.com/solacese/scds-solace-kdb)

## Run locally

First, clone the repository and install the dependencies.

```bash
git clone https://github.com/solacese/faa-scds-feeds-gui.git
cd faa-scds-feeds-gui
npm i
```

Then, edit `solace.config.js` and `google-maps.config.js`. The Google Maps API key included in this repository is locked down to the public URL we have hosted—so you'll need your own if you want to run it locally. Follow along [Google's instructions for getting a Maps JavaScript API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

Once the connection details and access key are configured, you can run the app using [Rollup](https://rollupjs.org):

```bash
npm run dev
```

If you navigate to [localhost:5000](http://localhost:5000) you should see the app running.

The `src` directory is being watched, so if you save a file and reload your browser you will see the changes.

Note: there's a small bug with sirv's dev server restarts, and sometimes the console will show that the app is being served to localhost:5001 while it is bundling. It will switch to localhost:5000 when it finishes bundling or sometimes on reload, so be a little patient and it should be fine. The visual glitch didn't affect my development experience at all, but if your app isn't being served successfully on localhost:5000, please add an issue to this repository.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Build and deploy

The build command is...

```bash
npm run build
```

...and the publish directory is `public`.

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies`.

## Resources

- [SWIM Flight Data Publication Service](https://www.faa.gov/air_traffic/technology/swim/sfdps/) - info about the data feeds this application uses for real-time aircraft position data
- [Topic Hierarchy and Topic Architecture Best Practices](https://solace.com/blog/topic-hierarchy-best-practices/) - a blog post dedicated to describing how to get the most out of your topic space, like we did with the aircraft position events
- [Google Maps Marker Clustering](https://developers.google.com/maps/documentation/javascript/marker-clustering) - docs that help explain the aircraft marker clustering that improves map performance
- [solclientjs](https://docs.solace.com/API-Developer-Online-Ref-Documentation/nodejs/readme.html) - docs for Solace's native JavaScript API
