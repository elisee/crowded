import { $ } from "../";

export const inGameDiv = $("body > .views > .in-game");

export function show() {
  inGameDiv.hidden = false;
}

export function onLoggedOut() {
  // TODO
}
