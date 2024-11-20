import express from "express";

function buildApp(): express.Application {
  const app = express();

  return app;
}

export default buildApp();
