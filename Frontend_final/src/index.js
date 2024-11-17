import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { MicrophoneProvider } from "./context/MicrophoneProvider";

/**setup axios */
axios.defaults.baseURL = "http://192.168.137.1:5000/api/tmdb";
// axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTllMGRhZTE1OWI3NTIxNmRjNDYzN2JhYTEwNTVhYyIsIm5iZiI6MTczMTgyNDE3NC4xMDU2NjE2LCJzdWIiOiI2MzI3ZjUyMzNiZDI2ZTAwODM1ODJlMDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T35RdapBs1KsMTAxjz360mQqf8ViIFSNfkxDVQzyLrE`

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <MicrophoneProvider>
      <RouterProvider router={router} />
    </MicrophoneProvider>
  </Provider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
