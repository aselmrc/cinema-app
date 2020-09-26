import React, { useState } from 'react';
import Slideshow from '../slide-show/Slideshow';
import Paginate from '../paginate/Paginate';
import './MainContent.scss';

function MainContent(props) {
  const images = [
    {
      url: 'https://i.pinimg.com/originals/7d/8c/ce/7d8ccec76db689e033adeac1074676b5.jpg'
    },
    {
      url: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/napavalley/Chappellet_Vineyard_Sunset_in_Fall_42eaa7cf-a1f1-4f6b-a260-b6890a6762db.jpg'
    },
    {
      url: 'https://wallpaperaccess.com/full/253484.jpg'
    }
  ];
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (type) => {
    if (type === 'prev' && currentPage >= 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <div className="main-content">
      <Slideshow images={images} auto={false} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={10} paginate={paginate} />
        </div>
      </div>
      {/* display grid component */}
    </div>
  );
}

export default MainContent;