import { $ } from "./index";
import { socket } from "./network";


export function refresh() {
  $(".live-games .content").hidden = true;
  $(".live-games .loading").hidden = false;

  socket.emit("getLiveGames", onLiveGamesReceived);
}

function onLiveGamesReceived(liveGames: LiveGameInfo[]) {
  $(".live-games .loading").hidden = true;
  $(".live-games .content").hidden = false;
}
