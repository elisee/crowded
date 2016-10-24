/// <reference path="../index.d.ts" />

import * as SocketIO from "socket.io";
import * as express from "express";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const port = process.env.PORT || 3000;

const config: PrivateConfig = JSON.parse(fs.readFileSync(`${__dirname}/../config.json`, { encoding: "utf8" }));
const publicConfig: PublicConfig = {
  twitch: {
    clientId: config.twitch.clientId,
    redirectURI: `${config.protocol}://${config.hostname}:${port}/auth/twitchtv/callback`
  }
};

const app = express();
const server = http.createServer(app);
const io = SocketIO(server, { transports: [ "websocket" ]});

app.use("/", express.static(`${__dirname}/../public`));

const twitchCallbackHTML = fs.readFileSync(path.resolve(`${__dirname}/twitchCallback.html`), { encoding: "utf8" }).replace("__TWITCH_CLIENT_ID__", config.twitch.clientId);
app.get("/auth/twitchtv/callback", (req, res) => {
  res.send(twitchCallbackHTML);
});

server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}.`);

  socket.on("disconnect", onDisconnect);
  socket.on("getLiveGames", onGetLiveGames);

  socket.emit("welcome", publicConfig);
});

function onDisconnect(this: SocketIO.Socket) {
  console.log(`Socket disconnected: ${this.id}.`);
}

function onGetLiveGames(this: SocketIO.Socket, callback: (liveGames: LiveGameInfo[]) => void) {
  callback([ { host: "test", contestants: [], service: "twitch.tv", title: "Woah", players: 69 } ]);
}