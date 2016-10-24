import * as topBar from "./topBar";
import { activeView } from "./";
import { config } from "./network";

Twitch.events.addListener("auth.login", onTwitchLoggedIn);
Twitch.events.addListener("auth.logout", onTwitchLoggedOut);

export let user: {
  display_name: string;
}

function onTwitchLoggedIn() {
  Twitch.api({ method: "/user", verb: "GET" }, (err, result) => {
    if (err != null) throw err;

    user = result;
    topBar.onLoggedIn();
    activeView.onLoggedIn();
  });

  topBar.onLoggingIn();
}

function onTwitchLoggedOut() {
  window.location.assign("/");
}

export function doTwitchLogin(authCallbackAppState: AppState|null) {
  if (authCallbackAppState == null) localStorage.removeItem("authCallbackAction");
  else localStorage.setItem("authCallbackAction", JSON.stringify(authCallbackAppState));

  Twitch.login({ redirect_uri: config.twitch.redirectURI, scope: [ "user_read" ], popup: false });
}
