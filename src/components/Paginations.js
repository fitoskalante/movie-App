import React from "react";
import Pagination from "react-bootstrap/Pagination";

export default function Paginations(props) {
  let { pageNumber, totalPages } = props;
  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  console.log("yes", pageNumber, totalPages);
  return (
    <div>
      <Pagination>
        <Pagination.First
          disabled={pageNumber === 1}
          onClick={() => props.handlePaginationTarget(1)}
        />
        <Pagination.Prev
          disabled={pageNumber === 1}
          onClick={() => props.handlePaginationTarget(pageNumber - 1)}
        />
        {pages.map(page => {
          if (page >= pageNumber - 2 && page <= pageNumber + 2)
            return (
              <Pagination.Item
                active={page === pageNumber}
                onClick={() => props.handlePaginationTarget(page)}
              >
                {page}
              </Pagination.Item>
            );
        })}
        <Pagination.Next
          disabled={pageNumber === totalPages}
          onClick={() => props.handlePaginationTarget(pageNumber + 1)}
        />
        <Pagination.Last
          disabled={pageNumber === totalPages}
          onClick={() => props.handlePaginationTarget(totalPages)}
        />
      </Pagination>
    </div>
  );
}
