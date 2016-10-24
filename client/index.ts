/// <reference path="./index.d.ts" />
/// <reference path="../index.d.ts" />

export const $ = (selector: string) => document.querySelector(selector) as HTMLElement;
export let appState: AppState = { view: "home" };
export let activeView: AppView;

import "./errorHandler";
import { socket, config } from "./network";

import * as homeView from "./homeView";
import * as hostGameView from "./hostGameView";
import * as inGameView from "./inGameView";
import * as topBar from "./topBar";

const views: { [name: string]: AppView } = {
  "home": homeView,
  "hostGame": hostGameView,
  "inGame": inGameView
};

export function setActiveView(newState: AppState) {
  appState = newState;

  for (const viewDiv of document.querySelectorAll("body > .views > div")) {
    (viewDiv as HTMLElement).hidden = true;
  }

  activeView = views[appState.view];
  activeView.show();
}

// Restore saved state if coming back from auth callback
const authCallbackViewStateJSON = localStorage.getItem("authCallbackAction");
if (authCallbackViewStateJSON != null) {
  localStorage.removeItem("authCallbackAction");
  appState = JSON.parse(authCallbackViewStateJSON);
}

// Setup initial view as soon as config has been received
socket.on("welcome", () => {
  setActiveView(appState);

  Twitch.init({ clientId: config.twitch.clientId }, (error, status) => {
    if (error != null) console.error(error);

    topBar.init(status.authenticated);
  });
});
