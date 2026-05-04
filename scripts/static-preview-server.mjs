import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm"
};

function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const pathname = cleanPath.endsWith("/") ? `${cleanPath}index.html` : cleanPath;
  const requested = path.resolve(root, `.${pathname}`);
  if (!requested.startsWith(root)) return null;
  if (fs.existsSync(requested) && fs.statSync(requested).isFile()) return requested;
  const withIndex = path.join(requested, "index.html");
  if (fs.existsSync(withIndex) && fs.statSync(withIndex).isFile()) return withIndex;
  return path.join(root, "404.html");
}

http
  .createServer((req, res) => {
    const file = resolveFile(req.url || "/");
    if (!file || !fs.existsSync(file)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(file);
    res.writeHead(file.endsWith("404.html") ? 404 : 200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => {
    console.log(`Static preview: http://localhost:${port}`);
  });
