import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './state/store'; // Import your Redux store
import App from './App';

ReactDOM.render(
  <Provider store={store}> {/* Wrap App with Provider and pass the Redux store */}
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
