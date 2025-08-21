// This is a Vitest configuration file that sets up the testing environment for a project.
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
