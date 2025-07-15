import React from "react";
import LandPage from "./pages/LandPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { Box } from "@mui/material"; 
import Home from "./pages/Home.jsx";
import {VideoMeet} from './pages/VideoMeet.jsx'
import History from "./pages/History.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History/>}/>
            <Route path="/:url" element={<VideoMeet/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
