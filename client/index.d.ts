interface LoadingViewState {
  view: "loading"
}

interface HomeViewState {
  view: "home"
}

interface HostGameViewState {
  view: "hostGame";
}

interface InGameViewState {
  view: "inGame";
  gameId: string;
}

type AppState = LoadingViewState | HomeViewState | HostGameViewState | InGameViewState;

interface AppView {
  show(): void;
  onLoggedOut(): void;
}
