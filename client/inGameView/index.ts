import { $, appState } from "../";
import { socket } from "../network";
import * as twitch from "../twitch";

export const inGameDiv = $("body > .views > .in-game");

export function show() {
  inGameDiv.hidden = false;

  const state = appState as InGameViewState;

  const channel = (state.channel == null && twitch.user != null) ? `twitch.tv/${twitch.user.display_name}` : state.channel;
  if (channel != null) joinGame(channel);
}

export function onLoggedIn() {
  const state = appState as InGameViewState;

  if (state.channel == null) {
    joinGame(twitch.user.display_name);
  }
}

function joinGame(channel: string) {
  const state = appState as InGameViewState;

  state.channel = channel;

  socket.emit("joinGame", channel, () => {
  });
}
