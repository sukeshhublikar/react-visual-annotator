import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig(() => {
  return {
    base: "./",
    plugins: [
      react(),
      dts(),
      viteTsconfigPaths(),
      nodePolyfills(),
      peerDepsExternal(),
    ],
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: 3000,
    },
    define: {
      global: "globalThis",
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/lib.tsx"),
        formats: ["es"],
        fileName: "react-visual-annotator",
      },
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        external: [
          "react", 
          "react-dom", 
          "react/jsx-runtime",
          "@mui/material",
          "@mui/icons-material",
          "@emotion/react",
          "@emotion/styled",
          "lodash",
          "moment"
        ],
        output: {
          // Provide global variables to use in the UMD build
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "@mui/material": "MaterialUI",
            "@mui/icons-material": "MaterialUIIcons",
            "@emotion/react": "emotionReact",
            "@emotion/styled": "emotionStyled",
            "lodash": "_",
            "moment": "moment"
          },
          // Enable code splitting for chunks
          manualChunks: undefined,
        },
      },
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 500,
    },
  };
});
