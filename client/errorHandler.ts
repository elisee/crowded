import { socket } from "./network";

function onError() {
  socket.close();
  document.body.className = "disconnected";
  document.body.innerHTML = "Whoops, you encountered a bug 😞. Plz reload the page.<br>Open the devtools console (F12) for details.";
}

window.onerror = onError;
