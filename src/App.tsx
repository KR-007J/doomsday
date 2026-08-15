import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ParticleField } from './components/visualizations/ParticleField';
import { CustomCursor } from './components/shared/CustomCursor';
import { useLenis } from './hooks/useLenis';
import { useThreatStore } from './features/threat-state-machine/useThreatStore';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { MonitoringDashboard } from './pages/MonitoringDashboard';
import { AttackLabPage } from './pages/AttackLabPage';
import { AboutPage } from './pages/AboutPage';
import { DevStateMachinePage } from './pages/DevStateMachinePage';
import { DevComponentsPage } from './pages/DevComponentsPage';

export const App: React.FC = () => {
  useLenis();
  const isAuthenticated = useThreatStore((s) => s.isAuthenticated);

  return (
    <Router>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 cursor-none">
        {/* Global Custom Cursor */}
        <CustomCursor />

        {/* GPU Particle Field Background */}
        <ParticleField />

        {/* Global Navbar */}
        <Navbar />

        {/* Route Content */}
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<LandingPage />} />
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
            <Route path="/dev/components" element={<DevComponentsPage />} />
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
