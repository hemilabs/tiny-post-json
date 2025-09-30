# tiny-post-json

Tiny wrapper around Fetch to POST JSON payloads to JSON APIs.

## Requirements

- Node.js 18+ (or any environment with `fetch` available)

## Install

```sh
npm install tiny-post-json
```

## Usage

```js
const postJson = require("tiny-post-json");

const res = await postJson(
  "https://any.json.api",
  { data: "anything" },
  { headers: { Authorization: "Bearer TOKEN" } },
);
// `res` will be an object resulting from parsing the JSON response
```

## API

### `postJson(resource, payload, options)`

POSTs the payload as JSON to the given URL.

- Throws an error if the request fails or the response is not 2xx.
- Returns a `Promise` with the response parsed as JSON.

#### `resource`

Type: `string | URL | Request`  
The resource to fetch, i.e. the URL.

#### `payload`

Type: `unknown`
The payload to send to the API. It can be anything that can be stringified as JSON.

#### `options`

Type: `RequestInit`  
Additional settings to apply to the request.
