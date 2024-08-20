import mongoose from "mongoose";
import Cabin from "../models/cabinModel.js";
import { ApiError } from "../Util/apiError.js";
import { catchAsync } from "../Util/catchAsync.js";
import multer from "multer";
import { CABIN_SORT_BY } from "../Util/cabinConstants.js";
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "cabins");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `cabin-${req.body.name}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Not an image! Please upload only images", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadCabinImage = upload.single("image");

export const getCabines = catchAsync(async (req, res) => {
  let cabines;
  const { discount, sortBy } = req.query;
  if (discount === "all" || !discount)
    cabines = await Cabin.find().sort(CABIN_SORT_BY.get(sortBy));
  if (discount === "no-discount")
    cabines = await Cabin.find({ discount: 0 }).sort(CABIN_SORT_BY.get(sortBy));
  if (discount === "with-discount")
    cabines = await Cabin.find({ discount: { $gt: 0 } }).sort(
      CABIN_SORT_BY.get(sortBy)
    );
  res.status(200).json({
    status: "success",
    data: { cabines },
  });
});
export const getImages = catchAsync(async (req, res) => {
  const id = req.params.id;
  const cabin = await Cabin.findById(id);
  res.status(200).json({
    status: "success",
    cabin,
  });
});

export const creteeeCabin = catchAsync(async (req, res, next) => {
  const { name, maxCapacity, regularPrice, discount, description } = req.body;
  const newCabin = await Cabin.create({
    name,
    maxCapacity,
    regularPrice,
    discount,
    image: `/${req.file.path}`,
    description,
  });
  if (!newCabin)
    return next(new ApiError("Could not create a new cabin ", 400));
  res.status(200).json({
    newCabin,
  });
});

export const deleteCabin = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Please provide a valid id", 400));
  }

  const deletedCabin = await Cabin.findByIdAndDelete(id);

  if (!deletedCabin) {
    return next(new ApiError("No booking found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Booking deleted successfully",
    data: { deletedCabin },
  });
});

export const duplicateCabin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Please provide a valid ID", 400));
  }

  const originalCabin = await Cabin.findById(id);

  if (!originalCabin) {
    return next(new ApiError("No cabin found with that ID", 404));
  }
  const { name, maxCapacity, regularPrice, discount, description, image } =
    originalCabin;
  const duplicateCabin = await Cabin.create({
    name: `Copy of ${name}`,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  });
  res.status(201).json({
    status: "success",
    message: "Cabin duplicated successfully",
    data: { duplicateCabin },
  });
});
export const UpdateCabin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.file) req.body.image = `/${req.file.path}`;
  if (!id) return next(ApiError("No cabin found with ID ", 404));
  const Updat = await Cabin.findByIdAndUpdate(id, { ...req.body });
  res.status(200).json({
    Updat,
  });
});
