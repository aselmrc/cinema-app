import React, { useEffect, useState, useRef } from 'react';
import MainContent from '../content/main-content/MainContent';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movie';
import Spinner from '../spinner/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Main.scss';
import { pathURL } from '../../redux/actions/routes';
import SearchResult from '../content/search-result/SearchResult';

function Main({ loadMoreMovies, page, errors, totalPages, setResponsePageNumber, pathURL, match, searchResult }) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    pathURL(match.path, match.url);
    setResponsePageNumber(currentPage, totalPages);
    loadMoreMovies('now_playing', currentPage);
    // eslint-disable-next-line
  }, [currentPage, totalPages]);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();
    if (bottomLineTop <= containerHeight) {
      fetchData();
    }
  };
  return (
    <>
      {!errors.message && !errors.statusCode && (
        <div className="main" ref={mainRef} onScroll={() => handleScroll()}>
          {loading ? <Spinner /> : <>{searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult />}</>}
          <div ref={bottomLineRef}></div>
        </div>
      )}
    </>
  );
}

Main.propTypes = {
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  loadMoreMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  searchResult: PropTypes.array,
  match: PropTypes.object,
  pathURL: PropTypes.func,
  errors: PropTypes.object
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  errors: state.errors,
  searchResult: state.movies.searchResult
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber, pathURL })(Main);
