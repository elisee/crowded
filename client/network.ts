import * as io from "socket.io-client";

export const socket = io.connect({ transports: [ "websocket" ], reconnection: false });
export let config: PublicConfig;

socket.on("welcome", (receivedConfig: PublicConfig) => {
  config = receivedConfig;
});
