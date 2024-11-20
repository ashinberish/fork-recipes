import app from "./app";

function bootServer(port: number) {
  return app.listen(() => {
    console.log(`listening at port: ${port}`);
  });
}

const PORT = parseInt(process.env["PORT"] ?? "5005", 10);

bootServer(PORT);
