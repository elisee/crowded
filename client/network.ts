import * as io from "socket.io-client";

export const socket = io.connect({ transports: [ "websocket" ], reconnection: false });
