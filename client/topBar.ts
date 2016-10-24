import { $, appState, activeView } from "./";
import * as twitch from "./twitch";

const topBarLoggedOutDiv = $(".top-bar .user .logged-out");
const topBarLoggedInDiv = $(".top-bar .user .logged-in");

topBarLoggedOutDiv.querySelector(".log-in").addEventListener("click", onLogInClick);
topBarLoggedInDiv.querySelector(".log-out").addEventListener("click", onLogOutClick);

function onLogInClick(event: MouseEvent) {
  event.preventDefault();
  twitch.doTwitchLogin(appState);
}

function onLogOutClick(event: MouseEvent) {
  event.preventDefault();

  // Will trigger twitch.onTwitchLoggedOut()
  Twitch.logout();
}

export function init(authenticated: boolean) {
  if (!authenticated) topBarLoggedOutDiv.hidden = false;
}

export function onLoggingIn() {
  topBarLoggedInDiv.hidden = true;
  topBarLoggedOutDiv.hidden = true;
}

export function onLoggedIn() {
  topBarLoggedInDiv.hidden = false;
  topBarLoggedInDiv.querySelector(".username").textContent = twitch.user.display_name;
}
