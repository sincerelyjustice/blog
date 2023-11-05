import { Route, Routes } from 'react-router-dom';
import { addPlaceholderPathParams } from 'js-toolkit/web';
import {
  getBlogBasePath,
  getBlogPathParamName,
  getBlogsErrorMessage,
  getHomePath,
  getLoadingMessage,
} from '../config/theme/selectors';
import { useBlogsContext } from './context/blogs';
import Layout from './components/layout';
import HomePage from './pages/home';
import BlogPage from './pages/blog';
import NotFoundPage from './pages/not-found';

const App = () => {
  const { blogs, error, initialised } = useBlogsContext();

  return initialised ? (
    <>
      {error && <p>{getBlogsErrorMessage()}</p>}
      {blogs && (
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
