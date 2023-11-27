import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { InitialisationContextProvider } from './app/context/initialisation';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <InitialisationContextProvider>
      <App />
    </InitialisationContextProvider>
  </Router>,
);
