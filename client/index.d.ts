interface LoadingViewState {
  view: "loading"
}

interface HomeViewState {
  view: "home"
}

interface InGameViewState {
  view: "inGame";
  channel?: string;
}

type AppState = LoadingViewState | HomeViewState | InGameViewState;

interface AppView {
  show(): void;
  onLoggedIn(): void;
}
