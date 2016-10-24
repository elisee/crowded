import { topBarLoggedInDiv, topBarLoggedOutDiv } from "./topBar";
import { config } from "./network";

Twitch.events.addListener("auth.login", onTwitchLoggedIn);
Twitch.events.addListener("auth.logout", onTwitchLoggedOut);

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

export function doTwitchLogin(authCallbackAppState: AppState|null) {
  if (authCallbackAppState == null) localStorage.removeItem("authCallbackAction");
  else localStorage.setItem("authCallbackAction", JSON.stringify(authCallbackAppState));

  Twitch.login({ redirect_uri: config.twitch.redirectURI, scope: [ "user_read" ], popup: false });
}
