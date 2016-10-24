import { $, setActiveView } from "../";
import * as twitch from "../twitch";

import * as liveGames from "./liveGames";
import * as contentPacks from "./contentPacks";

export const homeDiv = $("body > .views > .home");

homeDiv.querySelector(".live-games .actions > .host-game").addEventListener("click", onHostGameClick);

function onHostGameClick(event: MouseEvent) {
  event.preventDefault();

  const inGameViewState: InGameViewState = { view: "inGame" };

  if (Twitch.getToken() == null) twitch.doTwitchLogin(inGameViewState);
  else setActiveView(inGameViewState);
}

export function show() {
  homeDiv.hidden = false;

  liveGames.refresh();
  contentPacks.refresh();
}

export function onLoggedIn() {
  // Ignore
}
