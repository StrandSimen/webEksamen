import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000", //Alt vi sender til api skal gå til local host 3000
    },
  },
});
