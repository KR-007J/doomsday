import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarSweepCanvas } from '../components/visualizations/RadarSweepCanvas';
import { Activity, RefreshCw, Server, Wifi, Cpu, AlertCircle } from 'lucide-react';

interface NodeItem {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'degraded' | 'offline';
  latency: number;
  packets: string;
}

export const NetworkTopologyPage: React.FC = () => {
  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: 'NODE-01', name: 'Alpha Core', location: 'New York (US-EAST)', status: 'online', latency: 12, packets: '42.1 TB/s' },
    { id: 'NODE-02', name: 'Beta Relay', location: 'London (EU-WEST)', status: 'online', latency: 34, packets: '28.4 TB/s' },
    { id: 'NODE-03', name: 'Gamma Array', location: 'Tokyo (AP-EAST)', status: 'degraded', latency: 128, packets: '14.2 TB/s' },
    { id: 'NODE-04', name: 'Delta Transceiver', location: 'Frankfurt (EU-CENTRAL)', status: 'online', latency: 22, packets: '31.8 TB/s' },
    { id: 'NODE-05', name: 'Epsilon Node', location: 'Singapore (AP-SOUTH)', status: 'offline', latency: 0, packets: '0 KB/s' },
  ]);

  const [selectedNode, setSelectedNode] = useState<NodeItem>(nodes[0]);
  const [isPinging, setIsPinging] = useState(false);

  const handlePingAll = () => {
    setIsPinging(true);
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          latency: n.status === 'offline' ? 0 : Math.floor(Math.random() * 30) + 10,
        }))
      );
      setIsPinging(false);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full text-slate-100 p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 z-10 relative"
    >
      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display text-3xl font-light text-slate-100 tracking-tight">
            Network Topology & Node Array
          </h1>
          <p className="text-slate-400 text-xs font-mono mt-1">
            GLOBAL ULTRASONIC TRANSCEIVER TELEMETRY & SATELLITE UPLINK STATUS
          </p>
        </div>

        <button
          onClick={handlePingAll}
          disabled={isPinging}
          className="btn-google-primary text-xs font-mono flex items-center gap-2 py-2 px-4 shadow-lg"
          aria-label="Refresh telemetry pings for all nodes"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
          <span>{isPinging ? 'PINGING NODES...' : 'REFRESH ALL PINGS'}</span>
        </button>
      </header>

      {/* Grid Layout: Map Area (8 cols) + Node Selector (4 cols) */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Main Telemetry & Sweep Map (8 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
            <div className="w-full flex justify-between items-center mb-4 z-10">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-blue-400" />
                <h2 className="font-display text-xl text-slate-200">Global Spatial Scope</h2>
              </div>
              <span className="text-xs font-mono text-emerald-400">ACTIVE NODES: 4 / 5</span>
            </div>

            {/* Radar Scope Visualizer */}
            <div className="h-72 w-72 rounded-full overflow-hidden border border-slate-800 bg-slate-950/80 relative flex items-center justify-center my-4 shadow-2xl">
              <RadarSweepCanvas />
            </div>

            {/* Active Selected Node Bar */}
            <div className="w-full glass-panel p-3 rounded-lg border border-slate-800/80 flex items-center justify-between font-mono text-xs z-10 mt-2">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-400" />
                <span>SELECTED: <strong className="text-white">{selectedNode.name} ({selectedNode.id})</strong></span>
              </div>
              <span className="text-slate-400">{selectedNode.location}</span>
            </div>
          </div>

          {/* Node Status Matrix Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-1">Inbound Telemetry</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">116.6 TB/s</div>
              <div className="text-[11px] text-slate-500 mt-1">Aggregated bandwidth</div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-1">Average Latency</div>
              <div className="text-2xl font-bold font-mono text-blue-400">22.6 ms</div>
              <div className="text-[11px] text-slate-500 mt-1">Sub-30ms threshold</div>
            </div>

            <div className="glass-panel p-4 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 mb-1">Mesh Health</div>
              <div className="text-2xl font-bold font-mono text-amber-400">98.2%</div>
              <div className="text-[11px] text-slate-500 mt-1">1 Node degraded</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Node List & Detail Inspector (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col h-full">
            <h2 className="font-display text-xl text-slate-200 mb-4 flex items-center justify-between">
              <span>Active Transceivers</span>
              <Cpu className="w-4 h-4 text-blue-400" />
            </h2>

            <div className="space-y-3 flex-1">
              {nodes.map((node) => {
                const isSelected = node.id === selectedNode.id;
                return (
                  <motion.div
                    key={node.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500/50 shadow-md'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 font-medium text-slate-200 text-sm">
                        <span className={`w-2 h-2 rounded-full ${
                          node.status === 'online' ? 'bg-emerald-500' :
                          node.status === 'degraded' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'
                        }`} />
                        <span>{node.name}</span>
                      </div>
                      <span className="font-mono text-xs text-slate-400">{node.id}</span>
                    </div>

                    <div className="text-xs text-slate-400 flex justify-between font-mono mt-2">
                      <span>{node.location.split(' ')[0]}</span>
                      <span className={node.status === 'offline' ? 'text-rose-400' : 'text-slate-300'}>
                        {node.status === 'offline' ? 'OFFLINE' : `${node.latency} ms`}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Detailed Inspector Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider mb-2">Transceiver Specs</div>
              <div className="flex justify-between text-slate-300">
                <span>Bandwidth:</span>
                <span className="font-bold text-white">{selectedNode.packets}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Carrier Freq:</span>
                <span className="font-bold text-blue-400">20.4 kHz</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Status:</span>
                <span className={`font-bold uppercase ${
                  selectedNode.status === 'online' ? 'text-emerald-400' :
                  selectedNode.status === 'degraded' ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {selectedNode.status}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default NetworkTopologyPage;
