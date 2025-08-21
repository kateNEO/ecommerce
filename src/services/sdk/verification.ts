import { createApiRoot } from './loginCustomer.ts';

export async function verifyCredentials(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const apiRoot = createApiRoot({ email, password });
    const result = await apiRoot.me().get().execute();
    return result.statusCode === 200;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error');
    }
    return false;
  }
}
