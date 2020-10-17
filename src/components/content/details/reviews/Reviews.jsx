import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Reviews.scss';

function Reviews({ movie }) {
  const [reviews] = useState(movie[4]);

  return (
    <>
      <div className="movie-reviews">
        {reviews.results.length ? (
          reviews.results.map((data) => (
            <div className="reviews" key={uuidv4()}>
              <h3>{data.author}</h3>
              <div>{data.content}</div>
            </div>
          ))
        ) : (
          <p>No reviews to show</p>
        )}
      </div>
    </>
  );
}

Reviews.propTypes = {
  movie: PropTypes.array
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, {})(Reviews);
