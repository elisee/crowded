import { $ } from "../";
import { socket } from "../network";

export function refresh() {
  $(".content-packs .content").hidden = true;
  $(".content-packs .loading").hidden = false;

  socket.emit("getContentPacks", onContentPacksReceived);
}

function onContentPacksReceived(contentPacks: ContentPackInfo[]) {
  $(".content-packs .loading").hidden = true;
  $(".content-packs .content").hidden = false;
}
