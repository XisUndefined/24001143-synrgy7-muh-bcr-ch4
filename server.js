import http from "http";
import { join, extname } from "path";
import { readFile } from "fs/promises";
import { homeRouter } from "./routes/homeRoutes.js";
import { carRouter } from "./routes/carRoutes.js";

const serveFile = async (res, filePath) => {
  try {
    const data = await readFile(filePath);
    const ext = extname(filePath);
    let contentType = "text/plain";

    if (ext === ".css") {
      contentType = "text/css";
    } else if (ext === ".js") {
      contentType = "application/javascript";
    } else if (ext === ".png") {
      contentType = "image/png";
    } else if (ext === ".jpg" || ext === ".jpeg") {
      contentType = "image/jpeg";
    } else if (ext === ".svg") {
      contentType = "image/svg+xml";
    } else if (ext === ".html") {
      contentType = "text/html";
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end("Resource not found");
  }
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/" || req.url === "/index" || req.url === "/home") {
    homeRouter(req, res);
  } else if (req.url.startsWith("/cars")) {
    carRouter(req, res);
  } else if (req.url.startsWith("/Components")) {
    const filePath = join(process.cwd(), req.url);
    await serveFile(res, filePath);
  } else {
    const filePath = join(process.cwd(), "public", req.url);
    await serveFile(res, filePath);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
