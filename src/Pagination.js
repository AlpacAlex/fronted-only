import React from "react";
import { useState, useEffect } from "react";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

function Pagination({totalRecords, pageLimit, pageNeighbours, onPageChanged, currentPage}) {
    
    // const [totalPages, setTotalPages] = useState(0);
    // useEffect(() => {
    //     function changePage() {
    //         console.log("work effect")
    //         setTotalPages(Math.ceil(totalRecords / pageLimit));
    //     }
    //     changePage()
    // });

    

    const pages = range(1, Math.ceil(totalRecords / pageLimit)) || [];
    
    return (
        <nav aria-label="Countries Pagination">
            <button
            className="page-item"
            onClick={(e) => onPageChanged(e, currentPage-1)}>
                &laquo; 
            </button>
            {pages.map((page, index) => {
            return (
                <button
                key={index}
                className={`page-item${currentPage === page ? " active" : ""}`}
                onClick={(e) => onPageChanged(e, page)}>
                {page}
                </button>
            );
            })}
            <button
            className="page-item"
            onClick={(e) => onPageChanged(e, currentPage+1, pages.length)}>
                &raquo;
            </button>
        </nav>
);

    
}

export default Pagination;