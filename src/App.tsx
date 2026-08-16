import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { BottomNavBar } from './components/layout/BottomNavBar';
import { StoryPage } from './pages/StoryPage';
import { LandingPage } from './pages/LandingPage';
import { SOCMonitoringPage } from './pages/SOCMonitoringPage';
import { IntelligenceLogsPage } from './pages/IntelligenceLogsPage';
import { NetworkTopologyPage } from './pages/NetworkTopologyPage';
import { AttackLabPage } from './pages/AttackLabPage';
import { CinematicBackground } from './components/visualizations/CinematicBackground';
import { AnimatePresence } from 'framer-motion';

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<StoryPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/matrix" element={<LandingPage />} />
        <Route path="/monitoring" element={<SOCMonitoringPage />} />
        <Route path="/logs" element={<IntelligenceLogsPage />} />
        <Route path="/network" element={<NetworkTopologyPage />} />
        <Route path="/attack-lab" element={<AttackLabPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen text-primary-ui flex flex-col pt-14 pb-16 md:pb-0 relative selection:bg-accent-safe/30 selection:text-accent-safe overflow-hidden">
        <div className="fixed inset-0 z-0">
          <CinematicBackground />
        </div>
        <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
        <Navbar />
        <main className="relative z-10 flex-1 flex flex-col w-full">
          <AppRoutes />
        </main>
        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
