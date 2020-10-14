import { MOVIE_LIST, RESPONSE_PAGE, SET_ERROR, LOAD_MORE_RESULTS, MOVIE_TYPE, SEARCH_RESULT, SEARCH_QUERY } from '../types';
import { GET_MOVIES, SEARCH_API_URL } from '../../services/movie.services';

export const getMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(MOVIE_LIST, results, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
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
