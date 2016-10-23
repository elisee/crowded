/// <reference path="../index.d.ts" />

import { socket } from "./network";
import * as liveGames from "./liveGames";
import * as contentPacks from "./contentPacks";

export const $ = (selector: string) => document.querySelector(selector) as HTMLElement;

socket.on("disconnect", onDisconnect);
socket.on("welcome", onWelcome);

function onDisconnect() {
  document.body.className = "disconnected";
  document.body.innerHTML = "Whoops, you have been disconnected 😞. Plz reload the page.";
}

function onWelcome(config: PublicConfig) {
  Twitch.events.addListener("auth.login", onTwitchLoggedIn);

  Twitch.init({ clientId: config.twitch.clientId }, (error, status) => {
    if (error != null) console.error(error);

    console.log(status.authenticated);

    if (!status.authenticated) {
      // TODO: Don't do this automatically, do it when player clicks a button
      // TODO: Store current game and return to it after logging in
      // Twitch.login({ redirect_uri: config.twitch.redirectURI, scope: [ "user_read" ], popup: false });
    }
  });

  function onTwitchLoggedIn() {
    // alert("yay");
  }

  /*
  $(".top-bar .user .loading").hidden = true;
  $(".top-bar .user .info").hidden = false;

  liveGames.refresh();
  contentPacks.refresh();
  */
}
