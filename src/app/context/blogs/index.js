import { createContext, useContext, useEffect, useReducer } from 'react';
import { getBlogsEndpoint } from '../../../config/api/selectors';
import useFetch from '../../hooks/use-fetch';

export const BlogsContext = createContext();

const initialState = {
  blogs: null,
  error: false,
  loading: false,
  initialised: false,
};

export const SET_BLOGS = 'SET_BLOGS';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SET_INITIALISED = 'SET_INITIALISED';

export const blogsReducer = (state, action) => {
  switch (action.type) {
    case SET_BLOGS:
      return { ...state, blogs: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_INITIALISED:
      return { ...state, initialised: action.payload };
    default:
      return state;
  }
};

export const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, initialState);
  const { data, error, loading, get } = useFetch();

  useEffect(() => {
    get(getBlogsEndpoint());
  }, []);

  useEffect(() => {
    if (data) {
      dispatch({ type: SET_BLOGS, payload: data.blogs });
      dispatch({ type: SET_INITIALISED, payload: true });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      dispatch({ type: SET_ERROR, payload: error });
      dispatch({ type: SET_INITIALISED, payload: true });
    }
  }, [error]);

  useEffect(() => {
    dispatch({ type: SET_LOADING, payload: loading });
  }, [loading]);

  return (
    <BlogsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogsContext = () => {
  const value = useContext(BlogsContext);

  if (!value) {
    throw Error('Blogs context used without a wrapping provider');
  }

  return value;
};
