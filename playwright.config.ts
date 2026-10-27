import { defineConfig, devices } from "@playwright/test";

/**
 * E2E configuration. The suite runs against a production build on a separate
 * port with an isolated SQLite file so it never touches development data.
 * Browsers are installed on demand: npx playwright install chromium
 */
export default defineConfig({
  testDir: "./tests/e2e",
  globalSetup: "./tests/e2e/global-setup.ts",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3200",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command:
      "NODE_OPTIONS=--max-old-space-size=1536 LOCAL_DATABASE_PATH=./data/e2e.sqlite npx next start -p 3200",
    url: "http://localhost:3200/login",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
    env: {
      NEXT_TELEMETRY_DISABLED: "1",
      LOCAL_DATABASE_PATH: "./data/e2e.sqlite",
      // Fixed test-only secret so the production startup guard accepts the
      // e2e server (it runs `next start`, i.e. NODE_ENV=production). Not used
      // anywhere outside this disposable test database.
      LOCAL_SESSION_SECRET: "e2e-test-secret-not-a-real-deployment-secret-0001",
      // Both browser projects register 16 accounts from one loopback IP in
      // under ten minutes; lift the in-process limiter for the disposable
      // e2e server only. Production never sets this variable.
      RATE_LIMIT_DISABLED: "1",
    },
  },
});
