import React, { useState, useEffect } from 'react';
import Slideshow from '../slide-show/Slideshow';
import Paginate from '../paginate/Paginate';
import PropTypes from 'prop-types';
import './MainContent.scss';
import Grid from '../grid/Grid';
import { connect } from 'react-redux';
import { IMAGE_URL } from '../../../services/movie.services';
import { getMovies, setResponsePageNumber } from '../../../redux/actions/movie';

function MainContent(props) {
  const { list, totalPages, movieType, page, setResponsePageNumber, getMovies } = props;
  const [currentPage, setCurrentPage] = useState(page);
  const [images, setImages] = useState([]);
  const randomMovies = list.sort(() => Math.random() - Math.random()).slice(0, 4);

  const HEADER_TYPE = {
    now_playing: 'Now Playing',
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'Upcoming'
  };

  useEffect(() => {
    if (randomMovies.length) {
      const IMAGES = [
        {
          id: 1,
          url: `${IMAGE_URL}${randomMovies[0].backdrop_path}`
        },
        {
          id: 2,
          url: `${IMAGE_URL}${randomMovies[1].backdrop_path}`
        },
        {
          id: 3,
          url: `${IMAGE_URL}${randomMovies[2].backdrop_path}`
        },
        {
          id: 4,
          url: `${IMAGE_URL}${randomMovies[3].backdrop_path}`
        }
      ];
      setImages(IMAGES);
    }
    // eslint-disable-next-line
  }, []);

  const paginate = (type) => {
    let pageNumber = currentPage;
    if (type === 'prev' && currentPage >= 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 1;
    }
    setCurrentPage(pageNumber);
    setResponsePageNumber(pageNumber, totalPages);
    getMovies(movieType, pageNumber);
  };

  return (
    <div className="main-content">
      <Slideshow images={images} auto={false} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">{HEADER_TYPE[movieType]}</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
      <Grid />
    </div>
  );
}

MainContent.propTypes = {
  list: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  movieType: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  getMovies: PropTypes.func.isRequired,
  setResponsePageNumber: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType,
  page: state.movies.page
});

export default connect(mapStateToProps, { getMovies, setResponsePageNumber })(MainContent);
