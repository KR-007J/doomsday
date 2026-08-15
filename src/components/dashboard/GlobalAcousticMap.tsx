import React, { useState } from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';
import { Radio, ShieldAlert, Cpu, Activity, Signal } from 'lucide-react';

interface SensorNode {
  id: string;
  name: string;
  location: string;
  x: number; // % offset
  y: number; // % offset
  status: 'ONLINE' | 'ACTIVE_ATTACK' | 'WARNING';
  freq: string;
  micCount: number;
}

export const GlobalAcousticMap: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const activeCenter = useThreatStore((s) => s.activeFrequencyCenter);
  const config = THREAT_STATE_CONFIGS[currentState];

  const isThreat = currentState !== 'SAFE';

  const [selectedNode, setSelectedNode] = useState<string>('node-alpha');

  const nodes: SensorNode[] = [
    {
      id: 'node-alpha',
      name: 'SOC-Node-Alpha',
      location: 'Building A (Executive Suite)',
      x: 28,
      y: 42,
      status: isThreat ? 'ACTIVE_ATTACK' : 'ONLINE',
      freq: isThreat ? `${(activeCenter / 1000).toFixed(1)} kHz` : '20.5 kHz',
      micCount: 4,
    },
    {
      id: 'node-beta',
      name: 'SOC-Node-Beta',
      location: 'Building B (Server Vault)',
      x: 65,
      y: 32,
      status: isThreat ? 'WARNING' : 'ONLINE',
      freq: '19.2 kHz',
      micCount: 4,
    },
    {
      id: 'node-gamma',
      name: 'SOC-Node-Gamma',
      location: 'Perimeter West (Gate 04)',
      x: 20,
      y: 70,
      status: 'ONLINE',
      freq: '21.8 kHz',
      micCount: 2,
    },
    {
      id: 'node-delta',
      name: 'SOC-Node-Delta',
      location: 'Sub-level 02 (Data Center)',
      x: 52,
      y: 65,
      status: isThreat ? 'WARNING' : 'ONLINE',
      freq: '20.1 kHz',
      micCount: 6,
    },
    {
      id: 'node-epsilon',
      name: 'SOC-Node-Epsilon',
      location: 'Research Wing (Lab 09)',
      x: 82,
      y: 55,
      status: 'ONLINE',
      freq: '22.5 kHz',
      micCount: 4,
    },
  ];

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="relative p-4 bg-slate-950/80 rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between">
      {/* Map Header */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div className="flex items-center gap-2">
          <Signal className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            GLOBAL ACOUSTIC SENSOR ARRAY MAP
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> 5 ONLINE
          </span>
          {isThreat && (
            <span className="flex items-center gap-1 text-rose-400 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> ANOMALY BEAM DETECTED
            </span>
          )}
        </div>
      </div>

      {/* Map Grid / Tactical Surface */}
      <div className="relative w-full h-64 bg-slate-900/90 rounded-lg border border-slate-800/80 overflow-hidden">
        {/* World Grid Lines Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

        {/* Tactical Map SVG World Contour Outlines */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-15 pointer-events-none stroke-slate-600 fill-slate-800/20">
          {/* Stylized continent paths */}
          <path d="M 150 120 Q 250 80 350 150 T 280 300 T 160 220 Z" />
          <path d="M 450 100 Q 600 60 750 120 T 800 280 T 650 320 T 480 200 Z" />
          <path d="M 280 350 Q 320 380 300 450 T 250 420 Z" />
          <path d="M 750 320 Q 850 300 900 400 T 780 440 Z" />
        </svg>

        {/* Signal Beam Connection Arcs when Threat is Active */}
        {isThreat && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <line
              x1={`${nodes[0].x}%`}
              y1={`${nodes[0].y}%`}
              x2={`${nodes[1].x}%`}
              y2={`${nodes[1].y}%`}
              stroke={config.colorHex}
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
            <line
              x1={`${nodes[0].x}%`}
              y1={`${nodes[0].y}%`}
              x2={`${nodes[3].x}%`}
              y2={`${nodes[3].y}%`}
              stroke={config.colorHex}
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
          </svg>
        )}

        {/* Interactive Sensor Nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNode === node.id;
          const isNodeActive = node.status === 'ACTIVE_ATTACK';

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              {/* Radar pulse ripple ring */}
              <div
                className={`absolute inset-0 rounded-full animate-ping opacity-75 ${
                  isNodeActive
                    ? 'bg-rose-500 w-8 h-8 -top-2 -left-2'
                    : 'bg-cyan-500 w-6 h-6 -top-1 -left-1'
                }`}
              />

              {/* Node Marker Dot */}
              <div
                className={`relative w-4 h-4 rounded-full border-2 transition-transform duration-300 ${
                  isNodeActive
                    ? 'bg-rose-500 border-rose-300 shadow-lg shadow-rose-500/50 scale-125'
                    : isSelected
                    ? 'bg-cyan-400 border-white shadow-lg shadow-cyan-500/50 scale-125'
                    : 'bg-slate-900 border-cyan-500 hover:scale-110'
                }`}
              />

              {/* Node Label Tooltip */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 opacity-80 group-hover:opacity-100 transition-opacity bg-slate-950/90 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap pointer-events-none z-30 shadow-md">
                <span className="font-bold text-slate-200">{node.name}</span>
                <span className="text-slate-400 ml-1">({node.freq})</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Bar */}
      <div className="mt-3 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 z-10">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-100">{activeNodeData.name}</span>
          <span className="text-slate-400 text-[11px]">({activeNodeData.location})</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>MICS: <strong className="text-cyan-300">{activeNodeData.micCount} Array</strong></span>
          <span>BAND: <strong className="text-indigo-300">{activeNodeData.freq}</strong></span>
          <span className={`px-2 py-0.5 rounded text-[10px] ${
            activeNodeData.status === 'ACTIVE_ATTACK'
              ? 'bg-rose-950 text-rose-400 border border-rose-800'
              : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
          }`}>
            {activeNodeData.status}
          </span>
        </div>
      </div>
    </div>
  );
};
