import { catchAsync } from "../Util/catchAsync.js";
import Setting from "../models/setting.model.js";
export const setting = catchAsync(async (req, res) => {
  const { minimumNights, maximumNights, maximumGuests, breakfastPrice } =
    req.body;
  const settings = await Setting.findOneAndUpdate(
    {},
    {
      minimumNights,
      maximumNights,
      maximumGuests,
      breakfastPrice,
    },
    {
      new: true,
      upsert: true,
    }
  );
  res.status(200).json({
    status: "success",
    settings,
  });
});
