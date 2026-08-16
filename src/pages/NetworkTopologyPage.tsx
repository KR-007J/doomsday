import React, { useState } from 'react';
import { RadarSweepCanvas } from '../components/visualizations/RadarSweepCanvas';
import { INITIAL_NODES } from '../services/mocks/mockThreatEvents';
import { NodeStatus } from '../types/threat';

export const NetworkTopologyPage: React.FC = () => {
  const [nodes, setNodes] = useState<NodeStatus[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('NODE-01');
  const [panelState, setPanelState] = useState<'happy' | 'loading' | 'empty' | 'error'>('happy');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="flex-grow p-4 md:px-6 max-w-7xl mx-auto w-full flex flex-col gap-4 font-mono text-xs">
      {/* Subheader Status */}
      <div className="flex items-center justify-between py-2 border-b border-hairline">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-safe animate-pulse" />
          <span className="text-accent-safe font-bold uppercase tracking-wider">
            GLOBAL MAP: STABLE
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-2 border border-hairline rounded-card p-0.5 text-[10px]">
            <button
              onClick={() => setPanelState('happy')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'happy' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              LIVE
            </button>
            <button
              onClick={() => setPanelState('loading')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'loading' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              LOAD
            </button>
            <button
              onClick={() => setPanelState('empty')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'empty' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              EMPTY
            </button>
            <button
              onClick={() => setPanelState('error')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'error' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              ERR
            </button>
          </div>
          <span className="text-accent-safe font-bold">UPLINK: 99.8%</span>
        </div>
      </div>

      {/* Hero Radar Scope Card */}
      <section className="card-panel relative p-4 flex flex-col items-center justify-center min-h-[340px] overflow-hidden">
        {/* Scrolling Coordinate Marquee */}
        <div className="absolute top-2 left-0 right-0 overflow-hidden opacity-20 text-[9px] text-primary-ui whitespace-nowrap pointer-events-none">
          34.0522°N 118.2437°W | 40.7128°N 74.0060°W | 51.5074°N 0.1278°W | 35.6895°N 139.6917°E
        </div>

        {/* Sweep Canvas */}
        <RadarSweepCanvas size={280} />
      </section>

      {/* Operational Nodes Section */}
      <section className="flex flex-col gap-3 mt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-secondary-ui font-bold uppercase tracking-wider border-l-2 border-accent-safe pl-2">
            OPERATIONAL NODES
          </h2>
          <span className="text-tertiary-ui text-[10px] bg-surface-2 px-2 py-0.5 rounded border border-hairline">
            3 ACTIVE, 1 LOST
          </span>
        </div>

        {panelState === 'loading' && (
          <div className="card-panel p-8 text-center flex flex-col items-center justify-center gap-2 text-tertiary-ui min-h-[200px]">
             <span className="material-symbols-outlined animate-spin">sync</span>
             <span>LOADING NODE DATA...</span>
          </div>
        )}
        {panelState === 'empty' && (
          <div className="card-panel p-8 text-center flex flex-col items-center justify-center gap-2 text-tertiary-ui min-h-[200px]">
             <span className="material-symbols-outlined">blur_on</span>
             <span>NO NODES DETECTED IN SECTOR.</span>
          </div>
        )}
        {panelState === 'error' && (
          <div className="card-panel p-8 text-center flex flex-col items-center justify-center gap-2 text-accent-critical bg-accent-critical/5 min-h-[200px]">
             <span className="material-symbols-outlined">warning</span>
             <span>UPLINK ERROR: UNABLE TO FETCH NODE DATA.</span>
          </div>
        )}
        {panelState === 'happy' && (
          <>
            {/* Selected Primary Node Card */}
            <div className="card-panel border-l-4 border-accent-safe p-4 flex flex-col gap-3 bg-surface-2/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-safe" />
              <span className="font-bold text-primary-ui text-sm">{selectedNode.name}</span>
              <span className="text-tertiary-ui text-[10px]">[SELECTED]</span>
            </div>
            <span className="text-accent-safe font-bold">
              INTEGRITY: {selectedNode.integrity.toFixed(1)}%
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-hairline pt-3 text-xs">
            <div className="flex flex-col">
              <span className="text-tertiary-ui text-[10px] uppercase">LATITUDE</span>
              <span className="text-primary-ui font-bold">{selectedNode.latitude.toFixed(4)}°N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-tertiary-ui text-[10px] uppercase">LONGITUDE</span>
              <span className="text-primary-ui font-bold">{Math.abs(selectedNode.longitude).toFixed(4)}°W</span>
            </div>
            <div className="flex flex-col">
              <span className="text-tertiary-ui text-[10px] uppercase">GRAVITY CENTER</span>
              <span className="text-primary-ui font-bold">{selectedNode.gravityCenter.toFixed(2)} G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-tertiary-ui text-[10px] uppercase">UPTIME</span>
              <span className="text-primary-ui font-bold">{selectedNode.uptime}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-surface-1 h-1.5 rounded-full overflow-hidden mt-1">
            <div
              className="bg-accent-safe h-full transition-all duration-300"
              style={{ width: `${selectedNode.integrity}%` }}
            />
          </div>
        </div>

        {/* Other Nodes List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {nodes
            .filter((n) => n.id !== selectedNodeId)
            .map((node) => {
              const isLost = node.status === 'LOST';
              const isWarn = node.status === 'WARNING';
              return (
                <div
                  key={node.id}
                  onClick={() => !isLost && setSelectedNodeId(node.id)}
                  className={`card-panel p-3 flex justify-between items-center transition-all ${
                    isLost
                      ? 'opacity-50 cursor-not-allowed border-accent-critical/30'
                      : 'hover:border-white/30 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isLost ? 'bg-tertiary-ui' : isWarn ? 'bg-accent-warn animate-pulse' : 'bg-accent-safe'
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className={`font-bold ${isLost ? 'line-through text-tertiary-ui' : 'text-primary-ui'}`}>
                        {node.name}
                      </span>
                      <span className="text-tertiary-ui text-[10px]">
                        {node.latitude.toFixed(4)} / {node.longitude.toFixed(4)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    {isLost ? (
                      <span className="text-accent-critical text-[10px] font-bold">CONNECTION LOST</span>
                    ) : (
                      <span className={`font-bold ${isWarn ? 'text-accent-warn' : 'text-accent-safe'}`}>
                        {node.integrity.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
          </>
        )}

        {/* Deploy Node Action Button */}
        <button className="mt-2 w-full bg-surface-2 hover:bg-overlay border border-hairline text-primary-ui font-bold py-3.5 rounded-card uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe active:scale-[0.97]">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>DEPLOY NODE</span>
        </button>
      </section>
    </div>
  );
};
