"use strict";

const fetchJson = require("tiny-fetch-json");

/**
 * Post a JSON payload to URL and parses the JSON response.
 *
 * @param {string | URL | Request} resource The resource to fetch, i.e. the URL.
 * @param {unknown} payload The JSON payload to send.
 * @param {RequestInit} [options] Additional settings to apply to the request.
 * @returns {Promise<unknown>} The response parsed as JSON.
 */
function postJson(resource, payload, options = {}) {
  const { headers, ...otherOptions } = options;
  return fetchJson(resource, {
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    method: "POST",
    ...otherOptions,
  });
}

module.exports = postJson;
