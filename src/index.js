import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AppProvider} from "@shopify/polaris";
import en from '@shopify/polaris/locales/en.json';
import reportWebVitals from './reportWebVitals';
import "@shopify/polaris/build/esm/styles.css";

ReactDOM.render(<AppProvider i18n={en}><App /></AppProvider>, document.getElementById("root"));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


	