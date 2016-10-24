import { $, setActiveView } from "../";
import { doTwitchLogin } from "../twitch";

import * as liveGames from "./liveGames";
import * as contentPacks from "./contentPacks";

export const homeDiv = $("body > .views > .home");
homeDiv.querySelector(".live-games .actions > .host-game").addEventListener("click", onHostGameClick);

function onHostGameClick(event: MouseEvent) {
  event.preventDefault();

  const hostGameViewState: HostGameViewState = { view: "hostGame" };

  const token = Twitch.getToken();
  if (token == null) doTwitchLogin(hostGameViewState);
  else setActiveView(hostGameViewState);
}

export function show() {
  homeDiv.hidden = false;

  liveGames.refresh();
  contentPacks.refresh();
}

export function onLoggedOut() {
  // Nothing
}
