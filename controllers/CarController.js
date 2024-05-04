import { readFile } from "fs/promises";
import { join } from "path";

class CarController {
  static getCarsPage = async (req, res) => {
    try {
      const filePath = join(process.cwd(), "views", "cars.html");
      const htmlContent = await readFile(filePath, "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlContent);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 Internal Server Error</h1>");
    }
  };
  static searchCars = async (req, res) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const searchParams = new URLSearchParams(body);
        const driver = searchParams.get("driver");
        const date = searchParams.get("date");
        const time = searchParams.get("time");
        const availableAt = new Date(`${date}T${time}Z`);
        const passenger = parseInt(searchParams.get("passenger")) || 1;

        const dataPath = join(process.cwd(), "data", "cars.json");
        const carData = JSON.parse(await readFile(dataPath, "utf8"));

        const filteredCars = carData.filter((car) => {
          return (
            car.availableAt >= availableAt.toISOString() &&
            car.capacity >= passenger
          );
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(filteredCars));
      });
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  };
}

export default CarController;
