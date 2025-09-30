/**
 * Post a JSON payload to URL and parses the JSON response.
 * @param resource The resource to fetch, i.e. the URL.
 * @param payload The JSON payload to send.
 * @param options Additional settings to apply to the request.
 * @returns The response parsed as JSON.
 */
declare function postJson(
  resource: string | URL | Request,
  payload: unknown,
  options?: RequestInit,
): Promise<unknown>;

export = postJson;
