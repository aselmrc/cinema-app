import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import placeHolder from '../../assets/lazy_loader.gif';

function LazyImage(props) {
  const { src, alt, children, className } = props;
  const [imageSrc, setImagesSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                setImagesSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            treshold: 0.01,
            rootMargin: '75%'
          }
        );
        observer.observe(imageRef);
      } else {
        setImagesSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.observe(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    <>
      <div className={className} ref={setImageRef} style={{ backgroundImage: `url(${imageSrc})` }} alt={alt}>
        {children}
      </div>
    </>
  );
}

LazyImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string
};

export default LazyImage;
