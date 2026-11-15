import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    test: {
      environment: "node",
      env: {
        ...env,
        JWT_SECRET: "secreto-solo-para-tests",
        DATABASE_URL: "postgresql://postgres:tu_password_segura@localhost:5432/libreria_db",
      },
    },
  };
});
