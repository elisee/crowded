import { $, setActiveView } from "../";

export const hostGameDiv = $("body > .views > .host-game");

export function show() {
  hostGameDiv.hidden = false;
}

export function onLoggedOut() {
  setActiveView({ view: "home" });
}
