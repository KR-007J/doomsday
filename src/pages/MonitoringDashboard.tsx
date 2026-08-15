import React from 'react';
import { motion } from 'framer-motion';
import { SOCHeader } from '../components/dashboard/SOCHeader';
import { AcousticKpiGrid } from '../components/dashboard/AcousticKpiGrid';
import { RiskGauge } from '../components/dashboard/RiskGauge';
import { GlobalAcousticMap } from '../components/dashboard/GlobalAcousticMap';
import { ThreatExposureRings } from '../components/dashboard/ThreatExposureRings';
import { FrequencyBandBars } from '../components/dashboard/FrequencyBandBars';
import { ConstellationVisualizer } from '../components/dashboard/ConstellationVisualizer';
import { SpectrumChart } from '../components/visualizations/SpectrumChart';
import { SpectrogramCanvas } from '../components/visualizations/SpectrogramCanvas';
import { ThreatHistoryTable } from '../components/dashboard/ThreatHistoryTable';
import { ThreatDetailDrawer } from '../components/dashboard/ThreatDetailDrawer';

export const MonitoringDashboard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-6"
    >
      {/* 1. Header & Live SOC State Morph Pill */}
      <motion.div variants={itemVariants}>
        <SOCHeader />
      </motion.div>

      {/* 2. Top Acoustic KPI Summaries */}
      <motion.div variants={itemVariants}>
        <AcousticKpiGrid />
      </motion.div>

      {/* 3. Operational Grid 1: Radial Risk Gauge + Global Sensor Map + Exposure Rings */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <RiskGauge />
        <GlobalAcousticMap />
        <ThreatExposureRings />
      </motion.div>

      {/* 4. Operational Grid 2: Live Spectrum + Waterfall Canvas Spectrogram */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <SpectrumChart />
        <SpectrogramCanvas height={220} />
      </motion.div>

      {/* 5. Operational Grid 3: Exposed Channels Progress Bars + IQ Constellation Plot */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <FrequencyBandBars />
        <ConstellationVisualizer />
      </motion.div>

      {/* 6. Selected Threat Breakdown Drawer */}
      <motion.div variants={itemVariants}>
        <ThreatDetailDrawer />
      </motion.div>

      {/* 7. Incident Audit Log History Table */}
      <motion.div variants={itemVariants}>
        <ThreatHistoryTable />
      </motion.div>
    </motion.div>
  );
};
