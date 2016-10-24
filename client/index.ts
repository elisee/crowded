/// <reference path="../index.d.ts" />

import { socket, config } from "./network";
import * as liveGames from "./liveGames";
import * as contentPacks from "./contentPacks";

export const $ = (selector: string) => document.querySelector(selector) as HTMLElement;

socket.on("disconnect", onDisconnect);
socket.on("welcome", onWelcome);

const topBarLoggedOutDiv = $(".top-bar .user .logged-out");
const topBarLoggedInDiv = $(".top-bar .user .logged-in");

topBarLoggedOutDiv.querySelector(".log-in").addEventListener("click", onLogInClick);
topBarLoggedInDiv.querySelector(".log-out").addEventListener("click", onLogOutClick);

const homeDiv = $("body > .views > .home");
homeDiv.querySelector(".live-games .actions > .host-game").addEventListener("click", onHostGameClick);

const hostGameDiv = $("body > .views > .host-game");
const inGameDiv = $("body > .views > .in-game");

Twitch.events.addListener("auth.login", onTwitchLoggedIn);
Twitch.events.addListener("auth.logout", onTwitchLoggedOut);

function onDisconnect() {
  document.body.className = "disconnected";
  document.body.innerHTML = "Whoops, you have been disconnected 😞. Plz reload the page.";
}

function onError() {
  socket.close();
  document.body.className = "disconnected";
  document.body.innerHTML = "Whoops, you encountered a bug 😞. Plz reload the page.<br>Open the devtools console (F12) for details.";
}

window.onerror = onError;

interface AuthCallbackHostAction {
  view: "host-game";
}

interface AuthCallbackGameAction {
  view: "in-game";
  gameId: string;
}

type AuthCallbackAction = AuthCallbackHostAction | AuthCallbackGameAction ;

const authCallbackActionJSON = localStorage.getItem("authCallbackAction");
if (authCallbackActionJSON != null) {
  localStorage.removeItem("authCallbackAction");
  const authCallbackAction: AuthCallbackAction = JSON.parse(authCallbackActionJSON);

  homeDiv.hidden = true;

  if (authCallbackAction.view === "host-game") hostGameDiv.hidden = false;
  else if (authCallbackAction.view === "in-game") {
    inGameDiv.hidden = false;
    // TODO: authCallbackAction.gameId
  }
}


function onWelcome() {
  liveGames.refresh();
  contentPacks.refresh();

  Twitch.init({ clientId: config.twitch.clientId }, (error, status) => {
    if (error != null) console.error(error);

    if (!status.authenticated) {
      topBarLoggedOutDiv.hidden = false;
    } else {

    }
  });
}

function onTwitchLoggedIn() {
  Twitch.api({ method: "/user", verb: "GET" }, (err, result) => {
    if (err != null) throw err;

    topBarLoggedInDiv.hidden = false;
    topBarLoggedInDiv.querySelector(".username").textContent = result.display_name;
  });

  topBarLoggedOutDiv.hidden = true;
}

function onTwitchLoggedOut() {
  topBarLoggedInDiv.hidden = true;
  topBarLoggedOutDiv.hidden = false;
}

function onLogInClick(event: MouseEvent) {
  event.preventDefault();

  // TODO: Store current open game and return to it after logging in
  doTwitchLogin(null);
}

function doTwitchLogin(callbackAction: AuthCallbackAction|null) {
  if (callbackAction == null) localStorage.removeItem("authCallbackAction");
  else localStorage.setItem("authCallbackAction", JSON.stringify(callbackAction));

  Twitch.login({ redirect_uri: config.twitch.redirectURI, scope: [ "user_read" ], popup: false });
}

function onLogOutClick(event: MouseEvent) {
  event.preventDefault();

  Twitch.logout();
}

function onHostGameClick(event: MouseEvent) {
  event.preventDefault();

  const token = Twitch.getToken();
  if (token == null) doTwitchLogin({ view: "host-game" });
}
