export function isDevEnvironment(): boolean {
  return process.env["MODE"] === "development";
}

export function isProdEnvironment(): boolean {
  return process.env["MODE"] === "production";
}

export function formatDuration(ms: number) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
