import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/shared/CustomCursor';
import { useLenis } from './hooks/useLenis';
import { useThreatStore } from './features/threat-state-machine/useThreatStore';

import { IntroPage } from './pages/IntroPage';
import { LoginPage } from './pages/LoginPage';
import { MonitoringDashboard } from './pages/MonitoringDashboard';
import { AttackLabPage } from './pages/AttackLabPage';
import { AboutPage } from './pages/AboutPage';
import { DevStateMachinePage } from './pages/DevStateMachinePage';

export const App: React.FC = () => {
  useLenis();
  const isAuthenticated = useThreatStore((s) => s.isAuthenticated);

  return (
    <Router>
      <div className="relative min-h-screen bg-[#141313] text-[#e5e2e1] flex flex-col font-sans selection:bg-white/20 selection:text-white">
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Global Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 relative z-10 flex flex-col">
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/monitoring"
              element={isAuthenticated ? <MonitoringDashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/attack-lab"
              element={isAuthenticated ? <AttackLabPage /> : <Navigate to="/login" replace />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dev/state-machine" element={<DevStateMachinePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
