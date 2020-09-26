import React from 'react';
import './Grid.scss';
import Rating from '../rating/Rating';

function Grid(props) {
  // eslint-disable-next-line react/prop-types
  const { images } = props;

  return (
    <>
      <div className="grid">
        {
          // eslint-disable-next-line react/prop-types
          images.map((image, i) => (
            <div className="grid-cell" key={i} style={{ backgroundImage: `url(${image.url})` }}>
              <div className="grid-read-more">
                <button className="grid-cell-button">Read More</button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">Mission possible Mission possible Mission possible Mission possible Mission possible</span>
                <div className="grid-detail-rating">
                  <Rating rating={image.rating} totalStars={10} />
                  &nbsp;&nbsp;
                  <div className="grid-vote-avarage">{image.rating}</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default Grid;
