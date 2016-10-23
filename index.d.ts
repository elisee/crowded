declare module Twitch {
  interface InitOptions { clientId: string; }
  interface Status {
    authenticated: boolean;
    error: string;
    errorDescription: string;
    scope: Scope[];
    token: string;
  }

  interface LoginOptions {
    redirect_uri: string;
    scope: Scope[];
    popup: boolean;
  }

  type Scope = "user_read" | "channel_read";
  type GetStatusCallback = (err: Error|null, status: Status) => void;
  type LogoutCallback = () => void;

  interface APIOptions {
    method: string;
    verb?: string;
    params?: any;
  }

  type APICallback = (err: Error|null, result: any) => void;

  export function init(options: InitOptions, callback: GetStatusCallback): void;
  export function getStatus(callback: GetStatusCallback): void;
  export function getToken(): void;
  export function login(options: LoginOptions): void;
  export function logout(callback: LogoutCallback): void;
  export function api(options: APIOptions, callback: APICallback): void;

  interface TwitchEventEmitter extends NodeJS.EventEmitter {
    addListener(event: "auth.login", callback: Function): this;
    addListener(event: "auth.logout", callback: Function): this;
  }

  export const events: TwitchEventEmitter;
}

interface PrivateConfig {
  twitch: {
    clientId: string;
    secret: string;
    redirectURI: string;
  }
}

interface PublicConfig {
  twitch: {
    clientId: string;
    redirectURI: string;
  }
}

interface LoginData {
  twitch: {
    username: string;
    picture: string;
  };
  beam: {
    username: string;
    picture: string;
  };
}

interface LiveGameInfo {
  title: string;
  service: "twitch.tv"|"beam.pro";
  host: string;
  contestants: string[];
  players: number;
}

interface ContentPackInfo {
  title: string;
  curators: string[];
}
