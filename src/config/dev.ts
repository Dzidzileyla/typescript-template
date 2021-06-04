const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
    protocol: process.env.PROTOCOL,
    contextRoot: process.env.CONTEXT_ROOT,
  },
  swagger: {
    host: process.env.INGRESS_HOST,
    protocols: process.env.PROTOCOLS,
  },
};

export default config;
