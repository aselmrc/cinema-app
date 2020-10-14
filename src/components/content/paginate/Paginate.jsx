import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Paginate.scss';

function Paginate(props) {
  const { currentPage, totalPages, paginate } = props;
  const [page, setPage] = useState();
  const [totalPageNumber, setTotalPageNumber] = useState();

  useEffect(() => {
    setPage(currentPage);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages]);
  return (
    <>
      <span className="pageCount">
        {page} - {totalPageNumber}
      </span>
      <button className={page > 1 ? 'paginate-button' : 'paginate-button disable'} onClick={() => paginate('prev')}>
        Prev
      </button>
      <button className={page < `${totalPages}` ? 'paginate-button' : 'paginate-button disable'} onClick={() => paginate('next')}>
        Next
      </button>
    </>
  );
}

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Paginate;
