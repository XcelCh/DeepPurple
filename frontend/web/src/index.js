// import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
// import reportWebVitals from './reportWebVitals';
// import LandingPage from "./pages/LandingPage";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <LandingPage />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import LandingPage from "./pages/LandingPage";
import TextAnalyze from "./pages/TextAnalyze";
import LoginForm from "./pages/LoginForm";
import EditProfile from "./pages/EditProfile";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import ForgetPasswordForm from './pages/ForgetPasswordForm';
import SignUpForm from './pages/SignUpForm';
import UnauthorizedPage from "./pages/UnauthorizedPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="textSentiment" element={<TextAnalyze />} />
          <Route path="loginForm" element={<LoginForm />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="forgetPasswordForm" element={<ForgetPasswordForm />} />
          <Route path="signUpForm" element={<SignUpForm />} />
        </Route>
        <Route path="unauthorizedPage" element={<UnauthorizedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));