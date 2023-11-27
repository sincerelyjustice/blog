import { Route, Routes } from 'react-router-dom';
import { addPlaceholderPathParams } from 'js-toolkit/web';
import {
  getErrorMessage,
  getHomePath,
  getAboutPath,
  getBlogBasePath,
  getBlogPathParamName,
  getLoadingMessage,
} from '../config/theme/selectors';
import { useInitialisationContext } from './context/initialisation';
import Layout from './components/layout';
import HomePage from './pages/home';
import BlogPage from './pages/blog';
import AboutPage from './pages/about';
import NotFoundPage from './pages/not-found';

const App = () => {
  const { error, initialised } = useInitialisationContext();

  return initialised ? (
    <>
      {error ? (
        <p>{getErrorMessage()}</p>
      ) : (
        <Layout>
          <Routes>
            <Route path={getHomePath()} element={<HomePage />} />
            <Route
              path={addPlaceholderPathParams(
                getBlogBasePath(),
                getBlogPathParamName(),
              )}
              element={<BlogPage />}
            />
            <Route path={getAboutPath()} element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      )}
    </>
  ) : (
    <p>{getLoadingMessage()}</p>
  );
};

export default App;
