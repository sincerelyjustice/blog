import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  getAboutEndpoint,
  getBlogsEndpoint,
} from '../../../config/api/selectors';
import useFetch from '../../hooks/use-fetch';

export const InitialisationContext = createContext();

const initialState = {
  blogs: null,
  about: null,
  error: false,
  initialised: false,
};

export const SET_BLOGS = 'SET_BLOGS';
export const SET_ABOUT = 'SET_ABOUT';
export const SET_ERROR = 'SET_ERROR';
export const SET_INITIALISED = 'SET_INITIALISED';

export const initialisationReducer = (state, action) => {
  switch (action.type) {
    case SET_BLOGS:
      return { ...state, blogs: action.payload };
    case SET_ABOUT:
      return { ...state, about: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_INITIALISED:
      return { ...state, initialised: action.payload };
    default:
      return state;
  }
};

export const InitialisationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(initialisationReducer, initialState);
  const { data: blogsData, error: blogsError, get: getBlogs } = useFetch();
  const { data: aboutData, error: aboutError, get: getAbout } = useFetch();

  useEffect(() => {
    getBlogs(getBlogsEndpoint());
    getAbout(getAboutEndpoint());
  }, []);

  useEffect(() => {
    if (blogsData) {
      dispatch({ type: SET_BLOGS, payload: blogsData.blogs });
    }
  }, [blogsData]);

  useEffect(() => {
    if (aboutData) {
      dispatch({ type: SET_ABOUT, payload: aboutData });
    }
  }, [aboutData]);

  useEffect(() => {
    if (blogsError || aboutError) {
      dispatch({ type: SET_ERROR, payload: blogsError || aboutError });
    }
  }, [blogsError, aboutError]);

  useEffect(() => {
    if ((state.blogs && state.about) || state.error) {
      dispatch({ type: SET_INITIALISED, payload: true });
    }
  }, [state.blogs, state.about, state.error]);

  return (
    <InitialisationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InitialisationContext.Provider>
  );
};

export const useInitialisationContext = () => {
  const value = useContext(InitialisationContext);
  if (!value) {
    throw Error('Initialisation context used without a wrapping provider');
  }
  return value;
};
