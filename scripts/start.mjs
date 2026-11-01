import { readFile } from "node:fs/promises";
import { createRuntime, loadEnvironment } from "./http-runtime.mjs";
loadEnvironment();
const source = await readFile("dist/server/index.js", "utf8");
const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
const port = Number(process.env.PORT || 3000);
createRuntime(worker.fetch).listen(port, process.env.HOST || "0.0.0.0", () => console.log(`Atheon website listening on port ${port}`));
