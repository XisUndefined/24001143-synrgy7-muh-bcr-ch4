import CarController from "../controllers/CarController.js";

export function carRouter(req, res) {
  if (req.method === "GET") {
    CarController.getCarsPage(req, res);
  } else if (req.method === "POST" && req.url === "/cars/search") {
    CarController.searchCars(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page Not Found");
  }
}
