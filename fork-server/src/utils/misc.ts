export function isDevEnvironment(): boolean {
    return process.env["MODE"] === "development";
}

export function isProdEnvironment(): boolean {
    return process.env["MODE"] === "production";
}