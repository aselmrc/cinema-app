import { MOVIE_LIST, RESPONSE_PAGE, SET_ERROR, LOAD_MORE_RESULTS, MOVIE_TYPE, SEARCH_RESULT, SEARCH_QUERY, MOVIE_DETAILS } from '../types';
import { GET_MOVIES, MOVIE_CREDITS_URL, MOVIE_DETAILS_URL, MOVIE_IMAGES_URL, MOVIE_REVIEWS_URL, MOVIE_VIDEOS_URL, SEARCH_API_URL } from '../../services/movie.services';

export const getMovies = (type, pageNumber) => async (dispatch) => {
  try {
    console.log(type, pageNumber);
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(MOVIE_LIST, results, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      console.log('get movies', error);
      const payload = {
        message: error.response.data || error.response.data.status_message,
        statusCode: error.response.status
      };
      dispatchMethod(SET_ERROR, payload, dispatch);
    }
  }
};

export const loadMoreMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(LOAD_MORE_RESULTS, results, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const setResponsePageNumber = (page, totalPages) => async (dispatch) => {
  const payload = { page, totalPages };
  dispatchMethod(RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type) => async (dispatch) => {
  dispatchMethod(MOVIE_TYPE, type, dispatch);
};

const dispatchMethod = async (type, payload, dispatch) => {
  dispatch({ type, payload });
};

const getMoviesRequest = async (type, pageNumber) => {
  const movies = await GET_MOVIES(type, pageNumber);
  const { results, page, total_pages } = movies.data;

  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload };
};

export const searchResult = (query) => async (dispatch) => {
  try {
    if (query) {
      const movies = await SEARCH_API_URL(query);
      const { results } = movies.data;
      dispatchMethod(SEARCH_RESULT, results, dispatch);
    } else {
      dispatchMethod(SEARCH_RESULT, [], dispatch);
    }
  } catch (e) {
    if (e.response) {
      const payload = {
        message: e.response.data || e.response.data.status_message,
        statusCode: e.response.status
      };
      dispatchMethod(SET_ERROR, payload, dispatch);
    }
  }
};

export const searchQuery = (query) => async (dispatch) => {
  dispatchMethod(SEARCH_QUERY, query, dispatch);
};

export const movieDetails = (id) => async (dispatch) => {
  try {
    const details = await MOVIE_DETAILS_URL(id);
    const credits = await MOVIE_CREDITS_URL(id);
    const images = await MOVIE_IMAGES_URL(id);
    const videos = await MOVIE_VIDEOS_URL(id);
    const reviews = await MOVIE_REVIEWS_URL(id);

    const resp = await Promise.all([details, credits, images, videos, reviews])
      .then((values) => Promise.all(values.map((value) => value.data)))
      .then((response) => response);
    dispatchMethod(MOVIE_DETAILS, resp, dispatch);
  } catch (e) {
    if (e.response) {
      dispatchMethod(SET_ERROR, e.response.data.message, dispatch);
    }
  }
};
