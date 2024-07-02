import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store'; // Adjust the path as per your project structure

// Trusted Types policy definition
if (window.trustedTypes && !window.trustedTypes.createPolicy) {
  // Create the policy if it doesn't exist (for older browsers)
  window.trustedTypes.createPolicy = (name, policy) => policy;
}

// Create or update your Trusted Types policy
if (window.trustedTypes) {
  window.trustedTypes.createPolicy('default', {
    createHTML: (input) => input,
    createScript: (input) => input,
    createScriptURL: (input) => input,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
