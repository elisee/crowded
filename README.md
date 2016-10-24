# [Crowded](http://crowded.sparklinlabs.com/)

Game show for Twitch.tv and Beam.pro streams.

Code is public but I haven't decided on any license yet.  
Feel free to check it out and learn from it though.

## Config

There should be a `config.json` file at the root with the following structure:

```
{
  "protocol": /* "http" or "https" */,
  "hostname": /* "www.domain.tld" */,

  "twitch": {
    "clientId": /* "YOUR_TWITCH_APP_CLIENT_ID" */,
    "secret": /* "YOUR_TWITCH_APP_SECRET" */
  }
}

```

## Install, build and run

```
npm install
npm run build
node server
```

## Development

Run each of those commands in its own terminal.

```
npm run watch-server
npm run watch-client
npm run watchify-client
```
