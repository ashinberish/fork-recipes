import app from "./app";
import Logger from "@/utils/logger";
import { prisma } from "./utils/prisma";

async function bootServer(port: number) {
  const version = `pre-release - 1.0.0`

  try {
    Logger.info(`Starting server version ${version}`);
    Logger.info(`Starting server in ${process.env["MODE"]} mode`);
    Logger.info(`Connecting to database ${process.env["DB_NAME"]}...`);
    await prisma.$connect()
    Logger.success("Connected to database");

  } catch (error) {
    Logger.error("Failed to boot server");
    console.error(error);
    return process.exit(1);
  }
  return app.listen(PORT, () => {
    Logger.success(`API server listening on port: ${port}`);
  });
}

const PORT = parseInt(process.env["PORT"] ?? "5005", 10);

bootServer(PORT);
