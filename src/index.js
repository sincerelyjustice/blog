import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { BlogsContextProvider } from './app/context/blogs';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <BlogsContextProvider>
      <App />
    </BlogsContextProvider>
  </Router>,
);
