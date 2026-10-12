import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "termly-privacy-policy",
      configureServer(server) {
        const policyUrl =
          "https://app.termly.io/api/v1/consumer/policies/d57b5309-8c31-4c47-9b42-9752e9504c41/content";

        server.middlewares.use(async (request, response, next) => {
          if (request.url?.split("?")[0] !== "/api/privacy-policy.php") {
            next();
            return;
          }

          if (request.method !== "GET") {
            response.statusCode = 405;
            response.setHeader("Allow", "GET");
            response.end("Only GET requests are accepted.");
            return;
          }

          try {
            const upstream = await fetch(policyUrl);
            if (!upstream.ok) {
              throw new Error(`Termly returned HTTP ${upstream.status}.`);
            }

            const result = await upstream.json();
            if (
              typeof result.content !== "string" ||
              result.content.length === 0
            ) {
              throw new Error("Termly returned an invalid policy response.");
            }

            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.setHeader("Cache-Control", "public, max-age=300");
            response.end(JSON.stringify({ content: result.content }));
          } catch (error) {
            server.config.logger.error(
              `Unable to load the Termly privacy policy: ${error.message}`,
            );
            response.statusCode = 502;
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(
              JSON.stringify({
                message: "The privacy policy could not be loaded.",
              }),
            );
          }
        });
      },
    },
  ],
});