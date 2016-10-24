import * as io from "socket.io-client";

export const socket = io.connect({ transports: [ "websocket" ], reconnection: false });
export let config: PublicConfig;

socket.on("disconnect", () => {
  document.body.className = "disconnected";
  document.body.innerHTML = "Whoops, you have been disconnected 😞. Plz reload the page.";
});

socket.on("welcome", (receivedConfig: PublicConfig) => {
  config = receivedConfig;
});
