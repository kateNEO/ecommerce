import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getCreateAnonymousId } from '../../utils/getCreateAnonymousId';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/ts-client';

export const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY;
export const CLIENT_ID = import.meta.env.VITE_CT_CLIENT_ID;
export const CLIENT_SECRET = import.meta.env.VITE_CT_CLIENT_SECRET;
export const AUTH_HOST = import.meta.env.VITE_CT_AUTH_HOST;
export const API_HOST = import.meta.env.VITE_CT_API_HOST;
export const API_SCOPES = import.meta.env.VITE_API_SCOPES;

const TOKEN_KEY = 'ct_token';

const tokenCache = {
  get: () => {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set: (token: Record<string, unknown>) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  },
  remove: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },
};

const projectKey = PROJECT_KEY;
const scopes = API_SCOPES;
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_HOST,
  projectKey: projectKey,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    anonymousId: getCreateAnonymousId(),
  },
  scopes,
  httpClient: fetch,
  tokenCache,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_HOST,
  httpClient: fetch,
  enableRetry: true,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 200,
    backoff: false,
    retryCodes: [500, 503],
  },
};
console.log(httpMiddlewareOptions)
console.log(authMiddlewareOptions)

export const anonymousClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export let apiRoot = createApiBuilderFromCtpClient(
  anonymousClient
).withProjectKey({ projectKey: PROJECT_KEY });

export function setApiRoot(newRoot: typeof apiRoot) {
  apiRoot = newRoot;
}

