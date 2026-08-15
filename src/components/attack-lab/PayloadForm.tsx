import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Radio, Zap, RotateCcw } from 'lucide-react';
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
    <Card variant="surface-1" className="p-5 w-full">
      <div className="flex items-center justify-between border-b border-[#242728] pb-3 mb-4">
        <div>
          <h2 className="text-sm font-mono font-bold text-[#F2F3F5] uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-slate-300" />
            ACOUSTIC TRANSMITTER SIMULATOR
          </h2>
          <p className="text-xs font-mono text-[#9AA0A6]">
            Synthesize covert subcarrier modulated near-ultrasonic acoustic transmissions
          </p>
        </div>

        <button
          onClick={resetToSafe}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15171B] hover:bg-[#1B1E23] text-xs font-mono text-[#F2F3F5] border border-[#242728] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          RESET ENGINE
        </button>
      </div>

      <div className="space-y-4 font-mono text-xs">
        {/* Payload Input & Encoding Toggle */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[#F2F3F5] font-semibold">TRANSMISSION PAYLOAD</label>
            <div className="flex items-center gap-1 bg-[#15171B] p-0.5 rounded border border-[#242728]">
              <button
                onClick={() => setEncodingMode('TEXT')}
                className={`px-2 py-0.5 rounded text-[10px] ${
                  encodingMode === 'TEXT'
                    ? 'bg-[#242728] text-[#F2F3F5] font-semibold'
                    : 'text-[#9AA0A6]'
                }`}
              >
                TEXT
              </button>
              <button
                onClick={() => setEncodingMode('HEX')}
                className={`px-2 py-0.5 rounded text-[10px] ${
                  encodingMode === 'HEX'
                    ? 'bg-[#242728] text-[#F2F3F5] font-semibold'
                    : 'text-[#9AA0A6]'
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
            className="w-full bg-[#15171B] border border-[#242728] rounded-lg p-2.5 text-xs font-mono text-[#F2F3F5] focus:outline-none focus:border-[#5C6167] transition-colors"
            placeholder="Enter payload string or hex bytes..."
          />
        </div>

        {/* Frequency Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[#F2F3F5] font-semibold">CARRIER FREQUENCY</label>
            <span className="text-[#3ECF8E] font-bold">{(frequency / 1000).toFixed(2)} kHz</span>
          </div>
          <input
            type="range"
            min={18000}
            max={23500}
            step={100}
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full h-1.5 bg-[#15171B] rounded-lg appearance-none cursor-pointer accent-[#E6E6E6]"
          />
          <div className="flex justify-between text-[10px] text-[#5C6167] mt-1">
            <span>18.0 kHz (Audible Edge)</span>
            <span>20.5 kHz (Subcarrier)</span>
            <span>23.5 kHz (Ultrasonic)</span>
          </div>
        </div>

        {/* Duration Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[#F2F3F5] font-semibold">BURST DURATION</label>
            <span className="text-[#F2F3F5] font-bold">{duration.toFixed(1)} s</span>
          </div>
          <input
            type="range"
            min={1.0}
            max={10.0}
            step={0.5}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-1.5 bg-[#15171B] rounded-lg appearance-none cursor-pointer accent-[#E6E6E6]"
          />
        </div>

        {/* Transmit Trigger Action: Solid Near-White Primary CTA (NO GRADIENT) */}
        <div className="pt-2">
          <Button
            ref={btnTransmitRef}
            variant="primary"
            size="lg"
            onClick={handleTransmit}
            disabled={isTransmitting || currentState !== 'SAFE'}
            icon={<Zap className="w-4 h-4 text-[#07080A]" />}
            className="w-full"
          >
            {isTransmitting ? 'EMITTING ACOUSTIC SIGNAL...' : 'TRANSMIT COVERT ACOUSTIC SIGNAL'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
