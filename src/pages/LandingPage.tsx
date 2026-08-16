import React from 'react';
import { Link } from 'react-router-dom';
import { RadarSweepCanvas } from '../components/visualizations/RadarSweepCanvas';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export const LandingPage: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 max-w-7xl mx-auto w-full font-mono text-xs">
      {/* Left Column: Uplink Telemetry & Peripheral Nodes */}
      <aside className="hidden md:flex flex-col gap-4 w-64 shrink-0">
        {/* Telemetry Panel */}
        <div className="card-panel p-4 flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-safe opacity-60" />
          <h2 className="text-secondary-ui uppercase tracking-wider text-[11px] border-b border-hairline pb-1 border-dashed font-bold">
            UPLINK TELEMETRY
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex flex-col">
              <span className="text-tertiary-ui text-[10px] uppercase">Status</span>
              <span className="text-accent-safe font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-safe" /> 100.0%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-tertiary-ui text-[10px] uppercase">Packet Loss</span>
              <span className="text-accent-safe font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-safe" /> 0.00%
              </span>
            </div>
            <div className="col-span-2 flex flex-col mt-1">
              <span className="text-tertiary-ui text-[10px] uppercase">Active Coordinates</span>
              <span className="text-primary-ui font-mono">LAT: 38.8951° N</span>
              <span className="text-primary-ui font-mono">LNG: 77.0364° W</span>
            </div>
            <div className="col-span-2 flex flex-col mt-1">
              <span className="text-tertiary-ui text-[10px] uppercase">Crypto State</span>
              <span className="text-accent-warn font-mono">AES-256-GCM [SYNC]</span>
            </div>
          </div>
        </div>

        {/* Peripheral Nodes List */}
        <div className="flex-1 card-panel p-4 flex flex-col gap-3">
          <h2 className="text-secondary-ui uppercase tracking-wider text-[11px] border-b border-hairline pb-1 border-dashed font-bold">
            PERIPHERAL NODES
          </h2>
          <div className="flex flex-col gap-2 overflow-y-auto pr-1">
            {/* Node A1 */}
            <div className="p-2 border border-hairline rounded-sm bg-surface-2/60 relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-primary-ui font-bold">NODE 0X-A1</span>
                <span className="text-accent-warn">CONF: 24.0%</span>
              </div>
              <div className="w-full bg-surface-1 h-1 rounded-full overflow-hidden">
                <div className="bg-accent-warn h-full w-[24%]" />
              </div>
            </div>

            {/* Node B7 */}
            <div className="p-2 border border-hairline rounded-sm bg-surface-2/60 relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-primary-ui font-bold">NODE 0X-B7</span>
                <span className="text-accent-warn">CONF: 58.0%</span>
              </div>
              <div className="w-full bg-surface-1 h-1 rounded-full overflow-hidden">
                <div className="bg-accent-warn h-full w-[58%]" />
              </div>
            </div>

            {/* Node C2 */}
            <div className="p-2 border border-hairline rounded-sm bg-surface-2/60 relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-secondary-ui font-bold">NODE 0X-C2</span>
                <span className="text-tertiary-ui">CONF: 12.0%</span>
              </div>
              <div className="w-full bg-surface-1 h-1 rounded-full overflow-hidden">
                <div className="bg-surface-2 h-full w-[12%]" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Center Column: Neural Intercept Core Radar Canvas */}
      <section className="flex-1 card-panel relative flex flex-col overflow-hidden min-h-[500px]">
        {/* Micro Telemetry Corners */}
        <span className="absolute top-3 left-4 text-tertiary-ui text-[10px]">[LAT: 38.8951]</span>
        <span className="absolute top-3 right-4 text-tertiary-ui text-[10px]">[LNG: -77.0364]</span>
        <span className="absolute bottom-3 left-4 text-tertiary-ui text-[10px]">[SYS_TIME: 14:02:45Z]</span>
        <span className="absolute bottom-3 right-4 text-tertiary-ui text-[10px]">[NET: SECURE]</span>

        {/* Status Chips */}
        <div className="relative z-10 p-4 flex justify-between items-start pointer-events-none mt-2">
          <div className="flex flex-col gap-2">
            <div className="bg-surface-2/90 border border-hairline px-3 py-1.5 rounded-card flex items-center gap-2 shadow-elevation-1 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-warn" />
              <span className="text-primary-ui text-[11px] font-medium">Gravity active</span>
            </div>
            <div className="bg-surface-2/90 border border-hairline px-3 py-1.5 rounded-card flex items-center gap-2 shadow-elevation-1 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-safe" />
              <span className="text-primary-ui text-[11px] font-medium">Packet flow omnidirectional</span>
            </div>
          </div>

          <div className="bg-surface-2/90 border border-accent-safe/40 px-3 py-1.5 rounded-card flex items-center gap-2 shadow-elevation-2 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent-safe animate-pulse" />
            <span className="text-accent-safe font-bold uppercase text-[11px]">Scanning Sector 7G...</span>
          </div>
        </div>

        {/* Central Radar Target Canvas */}
        <div className="flex-1 flex items-center justify-center relative py-4">
          <RadarSweepCanvas size={300} />

          {/* Compact Telemetry Strip */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
            <div className="bg-surface-2/90 border border-hairline p-2 rounded-sm text-center">
              <span className="text-tertiary-ui text-[9px] block mb-0.5">RNG</span>
              <span className="text-primary-ui font-bold">12.4km</span>
            </div>
            <div className="bg-surface-2/90 border border-hairline p-2 rounded-sm text-center">
              <span className="text-tertiary-ui text-[9px] block mb-0.5">BRG</span>
              <span className="text-accent-warn font-bold">045°</span>
            </div>
            <div className="bg-surface-2/90 border border-hairline p-2 rounded-sm text-center">
              <span className="text-tertiary-ui text-[9px] block mb-0.5">SWP</span>
              <span className="text-accent-safe font-bold">4.0s</span>
            </div>
          </div>
        </div>

        {/* Floating Action CTA Button */}
        <div className="relative z-20 pb-6 flex justify-center">
          <Link to="/monitoring" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe rounded-card block">
            <button className="bg-accent-neutral text-canvas font-mono font-bold px-8 py-3.5 rounded-card uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center gap-3 shadow-elevation-3 active:scale-95 cursor-pointer w-full h-full focus-visible:outline-none">
              <span className="material-symbols-outlined text-[20px]">pause_circle</span>
              <span>STANDBY [ALT+S]</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Right Column: Active Hemorrhage Log Stream */}
      <aside className="hidden lg:flex flex-col w-72 shrink-0 card-panel overflow-hidden">
        <header className="p-3 border-b border-hairline bg-surface-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-secondary-ui">terminal</span>
            <span className="text-secondary-ui uppercase tracking-wider text-[11px] font-bold">Active Log</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-safe animate-pulse" />
            <span className="text-accent-safe text-[10px] font-bold">LIVE</span>
          </div>
        </header>

        <div className="flex-1 p-3 font-mono text-[11px] flex flex-col gap-2 overflow-y-auto">
          <div className="text-secondary-ui">
            <span className="text-tertiary-ui">[T-00:01]</span> &gt; DECRYPT_KEY_REQ: 0x4F2A... <span className="text-accent-warn">PENDING</span>
          </div>
          <div className="text-secondary-ui">
            <span className="text-tertiary-ui">[T-00:03]</span> &gt; PORT_SCAN DETECTED @ 192.168.1.104
          </div>
          {currentState === 'THREAT_LOGGED' && (
            <div className="p-2 border-l-2 border-accent-critical bg-accent-critical/10 text-accent-critical rounded-r flex flex-col gap-1">
              <span className="text-tertiary-ui">[T-00:04]</span>
              <span className="font-bold bg-accent-critical text-white px-1.5 py-0.5 rounded text-[9px] w-fit">ACTIVE HEMORRHAGE</span>
              <span>UNAUTHORIZED ACCESS ATTEMPT // COORD 34.0522°N.</span>
            </div>
          )}
          <div className="text-secondary-ui">
            <span className="text-tertiary-ui">[T-00:05]</span> &gt; INITIATING TRACE_ROUTE...
          </div>
          <div className="text-accent-safe">
            <span className="text-tertiary-ui">[T-00:08]</span> &gt; TRACE SUCCESS: HOP_7_VERIFIED
          </div>
          <div className="text-secondary-ui">
            <span className="text-tertiary-ui">[T-00:11]</span> &gt; PACKET_DUMP [SIZE: 4.2MB]
          </div>
          <div className="text-accent-warn">
            <span className="text-tertiary-ui">[T-00:15]</span> &gt; ANOMALY: UNKNOWN_PROTOCOL
          </div>
        </div>
      </aside>
    </div>
  );
};
