"use strict";

const { test } = require("node:test");
const assert = require("node:assert").strict;

const postJson = require("..");

function mockFetch(response, options = {}) {
  return function fetchMock(resource, fetchOptions) {
    if (options.check) {
      const valid = options.check(resource, fetchOptions);
      if (!valid) {
        return Promise.reject(new Error(`Mock fetch check failed: ${valid}`));
      }
    }
    return Promise.resolve({
      headers: {
        get: (header) =>
          header.toLowerCase() === "content-type"
            ? options.contentType || "application/json"
            : null,
      },
      json: () => Promise.resolve(response),
      ok: true,
      statusText: "ok",
    });
  };
}

// Patch global fetch for tests
function withMockedFetch(mock, fn) {
  const originalFetch = global.fetch;
  global.fetch = mock;
  return fn().finally(function () {
    global.fetch = originalFetch;
  });
}

test("Can POST a payload and parse a JSON response", async function () {
  const url = "https://api.example.com/hello";
  const payload = { greeting: "hello" };
  const response = { response: "world" };
  function check(resource, options) {
    assert.equal(resource, url);
    assert.equal(options.method, "POST");
    assert.equal(options.headers["Content-Type"], "application/json");
    assert.equal(options.headers["Accept"], "application/json");
    assert.deepEqual(JSON.parse(options.body), payload);
    return true;
  }
  await withMockedFetch(mockFetch(response, { check }), async function () {
    const data = await postJson(url, payload);
    assert.deepEqual(data, response);
  });
});
