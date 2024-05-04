import { readFile } from "fs/promises";
import { join } from "path";

class HomeController {
  static getHomePage = async (req, res) => {
    try {
      const filePath = join(process.cwd(), "views", "index.html");
      const htmlContent = await readFile(filePath, "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlContent);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 Internal Server Error</h1>");
    }
  };
}

export default HomeController;
