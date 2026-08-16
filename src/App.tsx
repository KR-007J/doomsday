import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { BottomNavBar } from './components/layout/BottomNavBar';
import { StoryPage } from './pages/StoryPage';
import { LandingPage } from './pages/LandingPage';
import { SOCMonitoringPage } from './pages/SOCMonitoringPage';
import { IntelligenceLogsPage } from './pages/IntelligenceLogsPage';
import { NetworkTopologyPage } from './pages/NetworkTopologyPage';
import { AttackLabPage } from './pages/AttackLabPage';
import { DevStatePanel } from './components/common/DevStatePanel';
import { CursorTrail } from './components/common/CursorTrail';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-canvas text-primary-ui flex flex-col pt-14 pb-16 md:pb-0 relative selection:bg-accent-safe/30 selection:text-accent-safe">
        <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
        <Navbar />
        <main className="relative z-10 flex-1 flex flex-col w-full">
          <Routes>
            <Route path="/" element={<StoryPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/matrix" element={<LandingPage />} />
            <Route path="/monitoring" element={<SOCMonitoringPage />} />
            <Route path="/logs" element={<IntelligenceLogsPage />} />
            <Route path="/network" element={<NetworkTopologyPage />} />
            <Route path="/attack-lab" element={<AttackLabPage />} />
          </Routes>
        </main>
        <BottomNavBar />
        <DevStatePanel />
        <CursorTrail />
      </div>
    </Router>
  );
};

export default App;
