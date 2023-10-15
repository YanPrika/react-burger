import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './components/app/App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();