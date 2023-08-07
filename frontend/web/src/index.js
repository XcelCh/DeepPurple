import "./index.css";

import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarLayout from "./pages/NavbarLayout";
import LandingPage from "./pages/LandingPage";
import TextAnalyze from "./pages/TextAnalyze";
import LoginForm from "./pages/LoginForm";
import EditProfile from "./pages/EditProfile";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";
import ForgetPasswordForm from "./pages/ForgetPasswordForm";
import SignUpForm from "./pages/SignUpForm";
import PaymentForm from "./pages/PaymentForm";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ChangePassword from "./pages/ChangePassword";
import Starter from "./pages/Starter";
import RecordingList from "./pages/RecordingList";
import Analysis from "./pages/Analysis";
import Sidebar from "./components/Sidebar";
import EmployeeList from "./pages/EmployeeList";
import AddRecording from "./pages/AddRecording";
import SummaryAnalysis from "./pages/SummaryAnalysis";
import EmployeeRecordingList from "./pages/EmployeeRecordingList";
import Billing from "./pages/Billing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="loginForm" element={<LoginForm />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="forgetPasswordForm" element={<ForgetPasswordForm />} />
          <Route path="signUpForm" element={<SignUpForm />} />
          <Route path="paymentForm" element={<PaymentForm />} />
          <Route path="starter" element={<Starter />} />
          <Route path="textSentiment" element={<TextAnalyze />} />
          <Route path="billing" element={<Billing />} />

          {/* With Sidebar */}
          <Route
            path="recordingList"
            element={
              <Sidebar>
                <RecordingList />
              </Sidebar>
            }
          />

          <Route
            path="employeeList"
            element={
              <Sidebar>
                <EmployeeList />
              </Sidebar>
            }
          />

          <Route
            path="employeeList/recordingList/:id"
            element={
              <Sidebar>
                <EmployeeRecordingList />
              </Sidebar>
            }
          />

          <Route
            path="recordingList/addRecording"
            element={
              <Sidebar>
                <AddRecording />
              </Sidebar>
            }
          />

          <Route
            path="analysis"
            element={
              <Sidebar>
                <Analysis />
              </Sidebar>
            }
          />

          <Route
            path="recordingList/analysis/:id"
            element={
              <Sidebar>
                <Analysis />
              </Sidebar>
            }
          />

          {/* Summary Analysis */}
          <Route
            path="summaryAnalysis"
            element={
              <Sidebar>
                <SummaryAnalysis />
              </Sidebar>
            }
          />

          {/* Unauthorized Page */}
          <Route path="unauthorizedPage" element={<UnauthorizedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
