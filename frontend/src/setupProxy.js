const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://uninterested-bear-galoshes.cyclic.app/",
      // target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
