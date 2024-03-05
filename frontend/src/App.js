import React from "react";
import PrimarySearchAppBar from "./Components/Header/Header";
import OutlinedCard from "./Components/Card/Card";
import Sidebar from "./Components/Sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import JobDetailsPage from "./Screens/JobDetailsPage";
import LoginScreen from "./company/Screens/LoginScreen";
import RegisterScreen from "./company/Screens/RegisterScreen";
import Dashboard from "./company/Screens/Dashboard";
import LandingPage from "./Screens/LandingPage";
import AllJobs from "./Screens/AllJobs";
import JobApply from "./Screens/JobApply";
import MyJobs from "./Screens/MyJobs";
import Profile from "./Screens/Profile";
import EditProfile from "./Screens/candidate/EditProfile";
import InterviewScreen from "./Screens/candidate/InterviewScreen";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header style={{ backgroundColor: "yellow" }}>
          {/* <PrimarySearchAppBar style={{ backgroundColor: "yellow" }} /> */}
        </header>
        <main className="">
          <Routes>
            <Route path="/listjob" element={<HomeScreen />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/alljobs" element={<AllJobs />} />
            {/* Company Routes */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/company/dashboard" element={<Dashboard />} />
            <Route path="/candidate/apply-job/:id" element={<JobApply />} />
            <Route path="/myjobs" element={<MyJobs />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/edit-profile/:id" element={<EditProfile />} />
            <Route path="/interview/:id" element={<InterviewScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
