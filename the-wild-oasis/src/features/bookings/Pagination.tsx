import React from "react";
import Tfoot from "../../UI/Table/Tfoot";
import "../../UI/Table/Table.scss";
interface Props {
  pageNumber: number;
  onPrevious: () => void;
  isLastPage: boolean;
  onNext: () => void;
  resultLength: number;
  totalCount: number;
}

const Pagination: React.FC<Props> = ({
  pageNumber,
  isLastPage,
  onPrevious,
  onNext,
  resultLength,
  totalCount,
}) => (
  <Tfoot>
    <span>
      Showing{" "}
      {pageNumber === 1
        ? pageNumber
        : !isLastPage
        ? (pageNumber - 1) * 10
        : (pageNumber - 1) * 10}{" "}
      to {isLastPage ? resultLength + (pageNumber - 1) * 10 : pageNumber * 10}{" "}
      of {totalCount} results
    </span>
    <div className="buttons">
      <button
        className={pageNumber <= 1 ? "not-allowed" : ""}
        disabled={pageNumber <= 1}
        onClick={onPrevious}
      >
        Previous
      </button>
      <button
        className={isLastPage ? "not-allowed" : ""}
        disabled={isLastPage}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  </Tfoot>
);

export default Pagination;
