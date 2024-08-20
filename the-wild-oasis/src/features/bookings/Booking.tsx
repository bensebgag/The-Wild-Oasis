import { useNavigate, useParams } from "react-router-dom";
import "./Booking.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../../Util/Spinner";
import {
  calculateWithFormatDate,
  formatDateCreatedBookingAt,
  formattedPrice,
} from "../../Util/hllper";
import Checkbox from "../../UI/Checkbox";
import {
  deleteBookingById,
  getBookingById,
  updateBookingCheckout,
  updateBookingChekin,
} from "../../services/bookingServices";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { AiOutlineDollarCircle } from "react-icons/ai";

import { useState } from "react";
function Booking() {
  const queryClient = useQueryClient();
  const useUpdateBookingCheckin = () => {
    return useMutation({
      mutationFn: (data: { id: string }) => updateBookingChekin(data.id),
      onSuccess: () => {
        queryClient.invalidateQueries(["booking"]);
      },
    });
  };
  const useUpdateBookingCheckout = () => {
    return useMutation({
      mutationFn: (data: { id: string }) => updateBookingCheckout(data.id),
      onSuccess: () => {
        queryClient.invalidateQueries(["booking"]);
      },
    });
  };
  const useDeleteBokkingById = () => {
    return useMutation({
      mutationFn: (data: { id: string }) => deleteBookingById(data.id),
      onSuccess: () => {
        queryClient.invalidateQueries(["booking"]);
      },
    });
  };
  const { id } = useParams();

  const updateBookingCheckinMutation = useUpdateBookingCheckin();
  const updateBookingCheckoutMutation = useUpdateBookingCheckout();
  const DeleteBookingByIdMutation = useDeleteBokkingById();
  const navigate = useNavigate();
  const handleCheckIn = function () {
    updateBookingCheckinMutation.mutate({ id });
    navigate("/dashboard");
  };
  const handleCheckOut = function () {
    updateBookingCheckoutMutation.mutate({ id });
  };
  const handleDelete = function () {
    DeleteBookingByIdMutation.mutate({ id });
    navigate(-1);
  };

  const handleBack = function () {
    navigate(-1);
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckboxChange = (): void => {
    setIsChecked(true);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id),
  });

  if (isLoading) return <Spinner />;

  if (isError) return <div>error</div>;
  const { created_at, endDate, numGuests, hasBreakfast, status, isPaid } =
    data.data.booking;
  const { fullName, email, nationalID } = data.data.booking.guestRef;
  const { name, regularPrice } = data.data.booking.cabinRef;
  const {
    numberOfNights,
    timeUntilStay,
    formattedStartDate,
    formattedEndDate,
  } = calculateWithFormatDate(created_at, endDate);
  const TotalPrice = hasBreakfast ? regularPrice + 30 : regularPrice;

  return (
    <div className="Booking">
      <div className="heading">
        <div>
          <h1>
            Booking <span>#{id} </span>
          </h1>
          <span
            className={`status ${
              status === "checked Out"
                ? "checked-out"
                : status === "checked In"
                ? "checked-in"
                : "unconfirmed "
            } `}
          >
            {status}
          </span>
        </div>

        <button onClick={handleBack}> Back</button>
      </div>
      <div className="body">
        <div className="body__head">
          <span>
            <HiOutlineHomeModern />
            {numberOfNights} nights in Cabin {name}
          </span>
          <span>
            {formattedStartDate}({timeUntilStay}) — {formattedEndDate}
          </span>
        </div>
        <div className="body__body">
          <div className="gest">
            <span>
              {fullName} + {numGuests - 1} guests
            </span>
            <span>• {email}</span>
            <span>• National ID {nationalID}</span>
          </div>
          <span className="breakfast">
            <IoCheckmarkCircleOutline />
            Breakfast included? {hasBreakfast ? "Yes" : "No"}
          </span>
          <div className={`price ${isPaid ? "paid" : ""}`}>
            <div>
              <span>
                <AiOutlineDollarCircle /> <span>Total price</span>
              </span>
              <span>
                {formattedPrice(TotalPrice)}{" "}
                {hasBreakfast &&
                  `(${formattedPrice(regularPrice)} cabin
                + $450.00 breakfast)`}
              </span>
            </div>
            <span>{!isPaid ? "WILL PAY AT PROPERTY" : "paid"}</span>
          </div>
          <span className="booked_day">
            Booked {formatDateCreatedBookingAt(created_at)}
          </span>
        </div>
      </div>
      {status === "unconfirmed" && (
        <>
          {!hasBreakfast && (
            <Checkbox
              isChecked={isChecked}
              handleCheckboxChange={handleCheckboxChange}
            >
              <span>Want to add breakfast for $1,650.00?</span>
            </Checkbox>
          )}
          <Checkbox
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
          >
            <span>
              I confirm that {fullName}has paid the total amount of{" "}
              {formattedPrice(TotalPrice)}
            </span>
          </Checkbox>
        </>
      )}

      <div className="buttons">
        {status !== "checked Out" && (
          <button
            className={`check ${
              !isChecked && status !== "checked In" && status !== "checked Out"
                ? "notAllowed"
                : ""
            }`}
            disabled={
              !isChecked && status !== "checked Out" && status !== "checked In"
            }
            onClick={status === "unconfirmed" ? handleCheckIn : handleCheckOut}
          >
            {status !== "checked In" || status === "unconfirmed"
              ? " Check in"
              : "Check out"}
          </button>
        )}
        <button onClick={handleDelete} className="delete">
          Delete booking
        </button>
        <button onClick={handleBack} className="back">
          Back
        </button>
      </div>
    </div>
  );
}

export default Booking;
