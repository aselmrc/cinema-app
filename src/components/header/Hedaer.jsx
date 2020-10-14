import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getMovies, setMovieType, setResponsePageNumber } from '../../redux/actions/movie';
import PropTypes from 'prop-types';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import logo from '../../logo.png';
import './Header.scss';
import { setError } from '../../redux/actions/errors';
import { pathURL } from '../../redux/actions/routes';

function Header({ setMovieType, getMovies, page, totalPages, setResponsePageNumber, routesArray, path, url, pathURL, setError, errors }) {
  let [navClass, setNavClass] = useState(false);
  let [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState('now-playing');
  const [hideHeader, setHideHeader] = useState(false);
  const [disableSearch, setDisableSearch] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const detailsRoute = useRouteMatch('/:id/:name/details');

  const HEADER_LIST = [
    {
      id: 1,
      iconClass: 'fas fa-film',
      name: 'Now Playing',
      type: 'now_playing'
    },
    {
      id: 2,
      iconClass: 'fas fa-fire',
      name: 'Popular',
      type: 'popular'
    },
    {
      id: 3,
      iconClass: 'fas fa-star',
      name: 'Top Rated',
      type: 'top_rated'
    },
    {
      id: 4,
      iconClass: 'fas fa-plus-square',
      name: 'Upcoming',
      type: 'upcoming'
    }
  ];

  useEffect(() => {
    if (routesArray.length) {
      if (!path && !url) {
        pathURL('/', '/');
        const error = new Error(`Page with pathname ${location.pathname} not found with status code 404.`);
        setError({ message: `Page with pathname ${location.pathname} not found.`, statusCode: 404 });
        throw error;
      }
    }
    // eslint-disable-next-line
  }, [path, url, routesArray, pathURL]);

  useEffect(() => {
    if (errors.message || errors.statusCode) {
      pathURL('/', '/');
      const error = new Error(`${errors.message} With status code ${errors.statusCode} `);
      setError({ message: `Page with pathname ${location.pathname} not found.`, statusCode: 404 });
      throw error;
    }
    // eslint-disable-next-line
  }, [errors]);

  useEffect(() => {
    if (path && !errors.message && !errors.statusCode) {
      getMovies(type, page);
      setResponsePageNumber(page, totalPages);
      if (detailsRoute || location.pathname === '/') {
        setHideHeader(true);
      }

      if (location.pathname !== '/' && location.key) {
        setDisableSearch(true);
      }
    }
    // eslint-disable-next-line
  }, [type, disableSearch, location, path]);

  const setMovieTypeUrl = (type) => {
    setDisableSearch(false);
    if (location.pathname !== '/') {
      history.push('/');
      setType(type);
      setMovieType(type);
    } else {
      setType(type);
      setMovieType(type);
    }
  };

  const toggleMenu = () => {
    menuClass = !menuClass;
    navClass = !navClass;
    setNavClass(navClass);
    setMenuClass(menuClass);
    if (navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  return (
    <>
      {hideHeader && (
        <div className="header-nav-wrapper">
          <div className="header-bar">
            <div className="header-navbar">
              <div className="header-image">
                <img src={logo} alt="logo" />
              </div>
              <div className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`} id="header-mobile-menu" onClick={() => toggleMenu()}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
              <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
                {HEADER_LIST.map((data) => (
                  <li key={data.id} className={data.type === type ? 'header-nav-item active-item' : 'header-nav-item'} onClick={() => setMovieTypeUrl(data.type)}>
                    <span className="header-list-name">
                      <i className={data.iconClass}></i>
                    </span>
                    &nbsp;
                    <span className="header-list-name">{data.name}</span>
                  </li>
                ))}
                <input className={`search-input ${disableSearch ? 'disabled' : ''}`} type="text" placeholder="Search for a movie" />
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Header.propTypes = {
  getMovies: PropTypes.func,
  setMovieType: PropTypes.func,
  path: PropTypes.string,
  page: PropTypes.number,
  setResponsePageNumber: PropTypes.func,
  totalPages: PropTypes.number,
  url: PropTypes.string,
  routesArray: PropTypes.array,
  pathURL: PropTypes.func,
  setError: PropTypes.func,
  errors: PropTypes.object
};

const mapStateToProps = (state) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  routesArray: state.routes.routesArray,
  path: state.routes.path,
  url: state.routes.url,
  errors: state.errors
});

export default connect(mapStateToProps, { getMovies, setMovieType, setResponsePageNumber, setError, pathURL })(Header);
