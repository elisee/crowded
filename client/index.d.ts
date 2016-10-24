interface LoadingViewState {
  view: "loading"
}

interface HomeViewState {
  view: "home"
}

interface InGameViewState {
  view: "inGame";
  gameId: string;
}

type AppState = LoadingViewState | HomeViewState | InGameViewState;

interface AppView {
  show(): void;
  onLoggedOut(): void;
}
