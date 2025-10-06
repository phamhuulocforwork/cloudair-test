import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react({
      exclude: /node_modules/,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("./", "./src"),
    },
  },
  server: {
    port: 3000,
    open: false,
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  optimizeDeps: {
    include: [
      "@measured/puck",
      "@mui/material",
      "@mui/material/Box",
      "@mui/material/Button",
      "@mui/material/Typography",
      "@mui/material/Select",
      "@mui/material/MenuItem",
      "@mui/material/FormControl",
      "@mui/material/Radio",
      "@mui/material/RadioGroup",
      "@mui/material/FormControlLabel",
      "@emotion/react",
      "@emotion/styled",
      "react-router-dom",
    ],
    force: true,
  },
  esbuild: {
    target: "es2020",
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
