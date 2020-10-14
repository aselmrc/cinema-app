import React, { useEffect, useState } from 'react';
import Rating from '../rating/Rating';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './Grid.scss';
import { connect } from 'react-redux';
import { IMAGE_URL } from '../../../services/movie.services';
import LazyImage from '../../lazy-image/LazyImage';

function Grid({ list }) {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  return (
    <>
      <div className="grid">
        {movieData.map((data, i) => (
          <div key={uuidv4()}>
            <LazyImage className="grid-cell" key={i} src={`${IMAGE_URL}${data.poster_path}`} alt="placeholder">
              <div className="grid-read-more">
                <button className="grid-cell-button">Read More</button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">{data.title}</span>
                <div className="grid-detail-rating">
                  <Rating rating={data.vote_average} totalStars={10} />
                  &nbsp;&nbsp;
                  <div className={data.vote_average}>{data.vote_average}</div>
                </div>
              </div>
            </LazyImage>
          </div>
        ))}
      </div>
    </>
  );
}

Grid.propTypes = {
  list: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  list: state.movies.list
});

export default connect(mapStateToProps, {})(Grid);
