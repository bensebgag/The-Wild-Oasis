import express from "express";
import {
  creteeeCabin,
  deleteCabin,
  duplicateCabin,
  getCabines,
  getImages,
  UpdateCabin,
  uploadCabinImage,
} from "../controlles/cabinController.js";

const router = express.Router();
router.route("/").get(getCabines);
router.route("/createAnewCabin").post(uploadCabinImage, creteeeCabin);
router.route("/updateCabin/:id").post(uploadCabinImage, UpdateCabin);
router.route("/:id").get(getImages).delete(deleteCabin).post(duplicateCabin);
export default router;
