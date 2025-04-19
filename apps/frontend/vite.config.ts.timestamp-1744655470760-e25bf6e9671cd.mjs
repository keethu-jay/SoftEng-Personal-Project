// vite.config.ts
import { defineConfig } from "file:///Users/thanhho/Programming/CS3733/team-d/.yarn/__virtual__/vite-virtual-631674d411/0/cache/vite-npm-6.2.3-3b400d2412-ba6ad7e83e.zip/node_modules/vite/dist/node/index.js";
import react from "file:///Users/thanhho/Programming/CS3733/team-d/.yarn/__virtual__/@vitejs-plugin-react-swc-virtual-3e8bccf326/0/cache/@vitejs-plugin-react-swc-npm-3.8.1-68d4bcd3e1-ef431a4132.zip/node_modules/@vitejs/plugin-react-swc/index.mjs";
import eslint from "file:///Users/thanhho/Programming/CS3733/team-d/.yarn/__virtual__/vite-plugin-eslint-virtual-1f4e08d8c3/0/cache/vite-plugin-eslint-npm-1.8.1-844ad445f5-123c3dcf82.zip/node_modules/vite-plugin-eslint/dist/index.mjs";
import tailwindcss from "file:///Users/thanhho/Programming/CS3733/team-d/.yarn/__virtual__/@tailwindcss-vite-virtual-3619a7e21f/0/cache/@tailwindcss-vite-npm-4.0.17-074c9bb3f2-9baaa79b9c.zip/node_modules/@tailwindcss/vite/dist/index.mjs";
import * as process from "process";
import path from "path";
var __vite_injected_original_dirname = "/Users/thanhho/Programming/CS3733/team-d/apps/frontend";
var vite_config_default = defineConfig({
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    host: "localhost",
    port: parseInt(process.env.FRONTEND_PORT),
    proxy: {
      "/api": process.env.BACKEND_URL
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: "build"
  },
  cacheDir: ".vite",
  plugins: [
    tailwindcss(),
    react(),
    eslint({
      exclude: ["**/node_modules/**", "**/.*/**", "**/.vite/**"],
      failOnWarning: false,
      failOnError: false
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlUm9vdCI6ICIvVXNlcnMvdGhhbmhoby9Qcm9ncmFtbWluZy9DUzM3MzMvdGVhbS1kL2FwcHMvZnJvbnRlbmQvIiwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGhhbmhoby9Qcm9ncmFtbWluZy9DUzM3MzMvdGVhbS1kL2FwcHMvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90aGFuaGhvL1Byb2dyYW1taW5nL0NTMzczMy90ZWFtLWQvYXBwcy9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGhhbmhoby9Qcm9ncmFtbWluZy9DUzM3MzMvdGVhbS1kL2FwcHMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IGVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJztcbmltcG9ydCAqIGFzIHByb2Nlc3MgZnJvbSAncHJvY2Vzcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcmVzb2x2ZToge1xuICAgICAgICBwcmVzZXJ2ZVN5bWxpbmtzOiB0cnVlLFxuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LkZST05URU5EX1BPUlQpLFxuICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgJy9hcGknOiBwcm9jZXNzLmVudi5CQUNLRU5EX1VSTCxcbiAgICAgICAgfSxcbiAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgIHVzZVBvbGxpbmc6IHRydWUsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgfSxcbiAgICBjYWNoZURpcjogJy52aXRlJyxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHRhaWx3aW5kY3NzKCksXG4gICAgICAgIHJlYWN0KCksXG4gICAgICAgIGVzbGludCh7XG4gICAgICAgICAgICBleGNsdWRlOiBbJyoqL25vZGVfbW9kdWxlcy8qKicsICcqKi8uKi8qKicsICcqKi8udml0ZS8qKiddLFxuICAgICAgICAgICAgZmFpbE9uV2FybmluZzogZmFsc2UsXG4gICAgICAgICAgICBmYWlsT25FcnJvcjogZmFsc2UsXG4gICAgICAgIH0pLFxuICAgIF0sXG5cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVixTQUFTLG9CQUFvQjtBQUNqWCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLFlBQVksYUFBYTtBQUN6QixPQUFPLFVBQVU7QUFMakIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsa0JBQWtCO0FBQUEsSUFDbEIsT0FBTztBQUFBLE1BQ0gsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3hDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sTUFBTSxTQUFpQixZQUFJLGFBQWE7QUFBQSxJQUN4QyxPQUFPO0FBQUEsTUFDSCxRQUFnQixZQUFJO0FBQUEsSUFDeEI7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNILFlBQVk7QUFBQSxJQUNoQjtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxFQUNaO0FBQUEsRUFDQSxVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsSUFDTCxZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDSCxTQUFTLENBQUMsc0JBQXNCLFlBQVksYUFBYTtBQUFBLE1BQ3pELGVBQWU7QUFBQSxNQUNmLGFBQWE7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDTDtBQUVKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
