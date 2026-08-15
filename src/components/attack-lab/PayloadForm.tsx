import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Radio, Zap, Sliders, Play, RotateCcw } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { useMagnetic } from '../../hooks/useMagnetic';

export const PayloadForm: React.FC = () => {
  const [payloadText, setPayloadText] = useState('ACOUSTIC_SHIELD_SECRET_TOKEN_2026');
  const [encodingMode, setEncodingMode] = useState<'TEXT' | 'HEX'>('TEXT');
  const [frequency, setFrequency] = useState(20500); // Hz
  const [duration, setDuration] = useState(4.0); // seconds
  const [isTransmitting, setIsTransmitting] = useState(false);

  const triggerSimulatedAttack = useThreatStore((s) => s.triggerSimulatedAttack);
  const resetToSafe = useThreatStore((s) => s.resetToSafe);
  const currentState = useThreatStore((s) => s.currentState);

  const btnTransmitRef = useMagnetic<HTMLButtonElement>(0.3);

  const handleTransmit = async () => {
    setIsTransmitting(true);
    await triggerSimulatedAttack({
      payload: payloadText,
      encodingType: encodingMode,
      frequencyMin: frequency - 1000,
      frequencyMax: frequency + 1000,
      duration,
      powerLevel: 85,
    });
    setIsTransmitting(false);
  };

  return (
    <Card variant="glass" className="p-5 w-full">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h2 className="text-base font-mono font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            ACOUSTIC TRANSMITTER SIMULATOR (MEMBER 2)
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Synthesize covert subcarrier modulated near-ultrasonic acoustic transmissions
          </p>
        </div>

        <button
          onClick={resetToSafe}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 border border-slate-800"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          RESET SOC STATE
        </button>
      </div>

      <div className="space-y-4 font-mono text-xs">
        {/* Payload Input & Encoding Toggle */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-slate-300 font-semibold">TRANSMISSION PAYLOAD</label>
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800">
              <button
                onClick={() => setEncodingMode('TEXT')}
                className={`px-2 py-0.5 rounded text-[10px] ${
                  encodingMode === 'TEXT'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400'
                }`}
              >
                TEXT
              </button>
              <button
                onClick={() => setEncodingMode('HEX')}
                className={`px-2 py-0.5 rounded text-[10px] ${
                  encodingMode === 'HEX'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400'
                }`}
              >
                HEX
              </button>
            </div>
          </div>

          <textarea
            rows={2}
            value={payloadText}
            onChange={(e) => setPayloadText(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            placeholder="Enter payload string or hex bytes..."
          />
        </div>

        {/* Frequency Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-slate-300 font-semibold">CARRIER FREQUENCY</label>
            <span className="text-cyan-400 font-bold">{(frequency / 1000).toFixed(2)} kHz</span>
          </div>
          <input
            type="range"
            min={18000}
            max={23500}
            step={100}
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>18.0 kHz (Audible Edge)</span>
            <span>20.5 kHz (Subcarrier)</span>
            <span>23.5 kHz (Ultrasonic)</span>
          </div>
        </div>

        {/* Duration Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-slate-300 font-semibold">BURST DURATION</label>
            <span className="text-indigo-300 font-bold">{duration.toFixed(1)} s</span>
          </div>
          <input
            type="range"
            min={1.0}
            max={10.0}
            step={0.5}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-400"
          />
        </div>

        {/* Transmit Trigger Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button
            ref={btnTransmitRef}
            variant="glow"
            size="lg"
            onClick={handleTransmit}
            disabled={isTransmitting || currentState !== 'SAFE'}
            icon={<Zap className="w-5 h-5" />}
            className="flex-1"
          >
            {isTransmitting ? 'EMITTING ACOUSTIC SIGNAL...' : 'TRANSMIT COVERT ACOUSTIC SIGNAL'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
