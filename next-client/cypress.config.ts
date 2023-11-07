import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
