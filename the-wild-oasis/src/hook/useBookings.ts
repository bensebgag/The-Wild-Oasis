// useBookings.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings", pageNumber, status, sortBy],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8800/api/v1/bookings?page=${
          pageNumber - 1
        }&status=${status}&sortBy=${sortBy}`
      );

      return response.data;
    },
  });

  const handleNextPage = () => {
    if (!data?.data.isLastPage) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return {
    bookings: data?.data.bookings,
    isLoading,
    isError,
    error,
    pageNumber,
    isLastPage: data?.data.isLastPage,
    handleNextPage,
    handlePreviousPage,
    resultLength: data?.data.resultLength,
    totalCount: data?.data.totalCount,
    status,
  };
};
