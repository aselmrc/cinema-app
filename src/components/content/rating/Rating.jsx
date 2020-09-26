import React, { useState, useEffect, Fragment, useRef } from 'react';
import PropType from 'prop-types';
import './Rating.scss';
import PropTypes from 'prop-types';

function Rating(props) {
  const { rating, totalStars, className } = props;
  const [numberOfStars, setNumberOfStars] = useState();
  const ratingRef = useRef();

  useEffect(() => {
    setNumberOfStars([...Array(totalStars).keys()].map(i => i + 1));
    let persentage;
    if (rating <= 5) {
      persentage = (rating / 5) * 100;
    } else {
      persentage = (rating / 10) * 100;
    }
    const startPersentage = `${Math.floor(persentage)}%`;
    ratingRef.current.style.width = startPersentage;
  }, [rating, totalStars]);

  return (
    <div className='star-rating'>
      <div className={`back-stars ${className}`}>
        {numberOfStars && numberOfStars.map((i) => (
          <Fragment key={i}>
            <i className='fa fa-star' aria-hidden='true'></i>
          </Fragment>
        ))}

        <div className={`front-stars ${className}`} ref={ratingRef}>
          {numberOfStars && numberOfStars.map((i) => (
            <Fragment key={i}>
              <i className='fa fa-star' aria-hidden='true'></i>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired
}

export default Rating;
