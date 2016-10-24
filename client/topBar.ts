import { $, appState, activeView } from "./";
import { doTwitchLogin } from "./twitch";

export const topBarLoggedOutDiv = $(".top-bar .user .logged-out");
export const topBarLoggedInDiv = $(".top-bar .user .logged-in");

topBarLoggedOutDiv.querySelector(".log-in").addEventListener("click", onLogInClick);
topBarLoggedInDiv.querySelector(".log-out").addEventListener("click", onLogOutClick);

function onLogInClick(event: MouseEvent) {
  event.preventDefault();
  doTwitchLogin(appState);
}

function onLogOutClick(event: MouseEvent) {
  event.preventDefault();

  Twitch.logout();
  activeView.onLoggedOut();
}

export function init(authenticated: boolean) {
  if (!authenticated) topBarLoggedOutDiv.hidden = false;
}
