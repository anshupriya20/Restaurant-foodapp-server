import express from "express" 
import upload from "../middlewares/multer";
import {isAuthenticated} from "../middlewares/isAuthenticated";
const { addMenu, editMenu } =  require("../controller/menuController");

const router = express.Router();

router.route("/").post(isAuthenticated, upload.single("image"), addMenu);
router.route("/:id").put(isAuthenticated, upload.single("image"), editMenu);
 
export default router;


