import { createProxyMiddleware } from "http-proxy-middleware";

module.export = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://momentum-clone-server.fly.dev",
      changeOrigin: true,
    })
  );
};
