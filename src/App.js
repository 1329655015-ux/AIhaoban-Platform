import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ImageGeneration from './pages/ImageGeneration';
import VideoGeneration from './pages/VideoGeneration';
import AIVoice from './pages/AIVoice';
import AISearch from './pages/AISearch';
import PPTGeneration from './pages/PPTGeneration';
import PaperAssistant from './pages/PaperAssistant';
import UserCenter from './pages/UserCenter';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="layout">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image" element={<ImageGeneration />} />
            <Route path="/video" element={<VideoGeneration />} />
            <Route path="/voice" element={<AIVoice />} />
            <Route path="/search" element={<AISearch />} />
            <Route path="/ppt" element={<PPTGeneration />} />
            <Route path="/paper" element={<PaperAssistant />} />
            <Route path="/user" element={<UserCenter />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
