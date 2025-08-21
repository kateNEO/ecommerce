import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { anonymousClient, PROJECT_KEY } from './BuildClient.ts';

export const apiRoot = createApiBuilderFromCtpClient(
  anonymousClient
).withProjectKey({
  projectKey: PROJECT_KEY,
});
