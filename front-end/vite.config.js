import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.lottie"],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mui/icons-material")) return "mui-icons";
            if (id.includes("@mui/material")) return "mui";
            if (id.includes("antd")) return "antd";
            if (id.includes("chart.js") || id.includes("react-chartjs-2"))
              return "charts";
            if (id.includes("xlsx")) return "xlsx";
            if (id.includes("lodash")) return "lodash";
          }
        },
      },
    },
  },
});
