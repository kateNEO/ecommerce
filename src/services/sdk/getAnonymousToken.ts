import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getCreateAnonymousId } from '../../utils/getCreateAnonymousId';

const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY;
const CLIENT_ID = import.meta.env.VITE_CT_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CT_CLIENT_SECRET;
const AUTH_HOST = import.meta.env.VITE_CT_AUTH_HOST;
const API_HOST = import.meta.env.VITE_CT_API_HOST;
const API_SCOPES = import.meta.env.VITE_API_SCOPES;

export async function getAnToken(): Promise<void> {
  const anonymousId = getCreateAnonymousId();

  const tokenCache = {
    get: () => {
      const token = localStorage.getItem('ct_token');
      return token ? JSON.parse(token) : undefined;
    },
    set: (token: object) => {
      localStorage.setItem('ct_token', JSON.stringify(token));
    },
    remove: () => {
      localStorage.removeItem('ct_token');
    },
  };

  const authOptions: AuthMiddlewareOptions = {
    host: AUTH_HOST,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      anonymousId,
    },
    scopes: API_SCOPES,
    httpClient: fetch,
    tokenCache,
  };

  const httpOptions: HttpMiddlewareOptions = {
    host: API_HOST,
    httpClient: fetch,
  };

  const tempClient = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withAnonymousSessionFlow(authOptions)
    .withHttpMiddleware(httpOptions)
    .build();

  const tempApiRoot = createApiBuilderFromCtpClient(tempClient).withProjectKey({
    projectKey: PROJECT_KEY,
  });

  try {
    await tempApiRoot
      .productProjections()
      .get({ queryArgs: { limit: 1 } })
      .execute();

    console.log('[getAnToken] New anonymous session started');
  } catch (e) {
    console.error('[getAnToken] Failed to start anonymous session:', e);
  }
}
