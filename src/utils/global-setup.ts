import { FullConfig } from "@playwright/test";
import dotenv from "dotenv";

async function globalSetup(config: FullConfig) {
  const test_env = process.env.test_env || "dev";

  if (test_env) {
    dotenv.config({
      path: `src/env/${test_env}.env`,
      override: true,
    });
  }
}
export default globalSetup;
