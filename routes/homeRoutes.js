import HomeController from "../controllers/HomeController.js";

export function homeRouter(req, res) {
  HomeController.getHomePage(req, res);
}
