import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Layout Components
import GovernmentHeader from './components/GovernmentHeader';
import Footer from './components/Footer';
import AIAdvisor from './components/AIAdvisor';

// Pages
import Home from './pages/Home';
import MyTraining from './pages/MyTraining';
import OutcomeDashboard from './pages/OutcomeDashboard';
import SkillRoadmap from './pages/SkillRoadmap';
import IndustryRequirements from './pages/IndustryRequirements';
import About from './pages/About';
import Login from './pages/Login';
import SkillGap from './pages/SkillGap';
import Survey from './pages/Survey';
import MyOutcomeDashboard from './pages/MyOutcomeDashboard';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] font-sans antialiased text-[#172B4D] selection:bg-[#F2A900] selection:text-[#032447]">
      
      {/* Official Government Top Header & Notice Bar */}
      <GovernmentHeader />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-training" element={<MyTraining />} />
          <Route path="/my-dashboard" element={<MyOutcomeDashboard />} />
          <Route path="/outcome-dashboard" element={<OutcomeDashboard />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/roadmap" element={<SkillRoadmap />} />
          <Route path="/industry-requirements" element={<IndustryRequirements />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Government Footer */}
      <Footer />

      {/* Floating AI Advisor Pill */}
      <AIAdvisor />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout />
      </Router>
    </AppProvider>
  );
}
