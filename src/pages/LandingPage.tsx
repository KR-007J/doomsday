import React from 'react';
import { Link } from 'react-router-dom';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../features/threat-state-machine/stateMachine';
import { ThreatStateType } from '../types/threat';

export const LandingPage: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const patternType = useThreatStore((s) => s.patternType);
  const setThreatState = useThreatStore((s) => s.setThreatState);
  const triggerSimulatedAttack = useThreatStore((s) => s.triggerSimulatedAttack);

  const config = THREAT_STATE_CONFIGS[currentState];

  const states: ThreatStateType[] = [
    'SAFE',
    'SIGNAL_DETECTED',
    'ANALYZING',
    'POTENTIAL_COVERT_COMMUNICATION',
    'THREAT_LOGGED',
  ];

  return (
    <div className="flex-grow flex flex-col items-center justify-center relative z-10 px-margin-page py-12 w-full max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center max-w-3xl w-full mb-16">
        {/* Supertitle Pill */}
        <div className="mb-stack-gap px-3 py-1 glass-panel rounded-full inline-block animate-slide-up-blur">
          <span className="font-label-caps text-label-caps text-primary/80 tracking-widest uppercase">
            ACOUSTIC AIR-GAP THREAT ENGINE (16kHz-24kHz)
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-stack-gap tracking-tight animate-slide-up-blur delay-100 uppercase">
          ACOUSTICSHIELD
        </h1>

        {/* Subtitle */}
        <p className="font-body-md text-body-md text-primary/70 max-w-2xl mb-8 animate-slide-up-blur delay-200 text-base md:text-lg">
          Enterprise-grade acoustic monitoring terminal detecting ultrasonic exfiltration attempts and unauthorized high-frequency payloads in secure environments.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-gutter w-full sm:w-auto items-center justify-center animate-slide-up-blur delay-300">
          <Link to="/monitoring" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-primary/90 text-[#07080A] font-body-md text-body-md px-6 py-3 rounded hover:bg-primary transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] font-semibold uppercase tracking-wider">
              Open SOC Monitoring
            </button>
          </Link>

          <Link to="/attack-lab" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-transparent text-primary border border-white/20 font-body-md text-body-md px-6 py-3 rounded hover:bg-white/10 backdrop-blur-md transition-all duration-200 cursor-pointer uppercase tracking-wider">
              Launch Attack Lab
            </button>
          </Link>
        </div>
      </div>

      {/* Live Engine State Card */}
      <div className="w-full max-w-lg glass-panel rounded-xl p-card-padding mb-16 shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-300 animate-slide-up-blur">
        <div className="flex justify-between items-center mb-stack-gap border-b border-white/10 pb-stack-gap">
          <h2 className="font-headline-md text-headline-md text-primary font-bold">Live Engine State</h2>
          <div
            className="flex items-center gap-unit px-2 py-1 rounded border transition-colors duration-300"
            style={{
              backgroundColor: `${config.colorHex}20`,
              borderColor: `${config.colorHex}40`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: config.colorHex,
                boxShadow: `0 0 8px ${config.colorHex}`,
              }}
            />
            <span
              className="font-label-caps text-label-caps uppercase tracking-wider font-bold"
              style={{ color: config.colorHex }}
            >
              {config.label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-gutter mb-4">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-primary/60 mb-unit uppercase">Confidence Interval</span>
            <span className="font-data-mono text-data-mono text-primary data-value text-lg font-bold" style={{ color: config.colorHex }}>
              {confidence.toFixed(3)}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-primary/60 mb-unit uppercase">Current Risk Level</span>
            <span className="font-data-mono text-data-mono text-primary data-value text-lg">
              {config.risk === 'LOW' ? 'Lvl 0 - Nominal' : config.risk === 'MEDIUM' ? 'Lvl 1 - Advisory' : 'Lvl 2 - Critical'}
            </span>
          </div>
          <div className="flex flex-col col-span-2 mt-unit">
            <span className="font-label-caps text-label-caps text-primary/60 mb-unit uppercase">Last Scan Signature</span>
            <span className="font-data-mono text-data-mono text-primary/80 data-value truncate">
              0x9F2A...E4B1 [{patternType.toUpperCase()}]
            </span>
          </div>
        </div>

        {/* State Machine Controller Jumper Buttons */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="font-label-caps text-label-caps text-primary/60 uppercase tracking-widest text-[10px]">
              THREAT STATE SIMULATOR CONTROLLER
            </span>
            <button
              onClick={() => triggerSimulatedAttack({ frequencyMin: 20000, frequencyMax: 22000, duration: 4 })}
              className="text-[10px] font-mono text-primary/80 hover:text-primary underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[12px]">bolt</span> AUTO ATTACK
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {states.map((st) => {
              const stateConf = THREAT_STATE_CONFIGS[st];
              const isActive = currentState === st;
              return (
                <button
                  key={st}
                  onClick={() => setThreatState(st)}
                  className={`p-1.5 rounded text-center font-mono text-[10px] transition-all ${
                    isActive
                      ? 'bg-white/15 border border-white/40 font-bold text-white shadow-sm'
                      : 'bg-white/5 border border-white/5 text-primary/60 hover:text-primary hover:bg-white/10'
                  }`}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: stateConf.colorHex }}
                  />
                  <div className="truncate text-[9px]">{stateConf.state.split('_')[0]}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feature Grid (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter w-full">
        {/* Feature 1 */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col h-full hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,255,255,0.03)] transition-all duration-300 animate-slide-up-blur">
          <div className="mb-4 text-primary/80">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              graphic_eq
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-stack-gap text-lg font-bold">
            Real-Time Spectrogram
          </h3>
          <p className="font-body-md text-body-md text-primary/70 flex-grow leading-relaxed">
            Visualize acoustic environments with millisecond precision. Identify hidden ultrasonic frequencies used in data exfiltration attempts before they breach the air-gap.
          </p>
          <div className="mt-stack-gap pt-stack-gap border-t border-white/10">
            <span className="font-data-mono text-data-mono text-primary/50 text-[10px]">FREQ_RANGE: 16kHz - 24kHz</span>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col h-full hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,255,255,0.03)] transition-all duration-300 animate-slide-up-blur delay-100">
          <div className="mb-4 text-primary/80">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-stack-gap text-lg font-bold">
            5-State Threat Engine
          </h3>
          <p className="font-body-md text-body-md text-primary/70 flex-grow leading-relaxed">
            Machine learning driven classification model categorizing acoustic anomalies into five distinct threat states, minimizing false positives in noisy server rooms.
          </p>
          <div className="mt-stack-gap pt-stack-gap border-t border-white/10">
            <span className="font-data-mono text-data-mono text-primary/50 text-[10px]">MODEL_V: SEC_ACST_v4.2</span>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="glass-panel rounded-xl p-card-padding flex flex-col h-full hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,255,255,0.03)] transition-all duration-300 animate-slide-up-blur delay-200">
          <div className="mb-4 text-primary/80">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              science
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary mb-stack-gap text-lg font-bold">
            Attack Lab Simulator
          </h3>
          <p className="font-body-md text-body-md text-primary/70 flex-grow leading-relaxed">
            Safely simulate advanced acoustic malware vectors against your infrastructure. Test detection capabilities without deploying actual malicious payloads.
          </p>
          <div className="mt-stack-gap pt-stack-gap border-t border-white/10">
            <span className="font-data-mono text-data-mono text-primary/50 text-[10px]">ENV: ISOLATED_SANDBOX</span>
          </div>
        </div>
      </div>
    </div>
  );
};
