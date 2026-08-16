import React from 'react';
import { Chapter1Hero } from '../components/story/Chapter1Hero';
import { Chapter2Pipeline } from '../components/story/Chapter2Pipeline';
import { Chapter3Preview } from '../components/story/Chapter3Preview';
import { Chapter4Classification } from '../components/story/Chapter4Classification';

export const StoryPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-[#F5F5F5] font-sans selection:bg-[#E83939]/30 selection:text-[#E83939]">
      {/* Chapter 1: Hero */}
      <Chapter1Hero />

      {/* Chapter 2: Detection Pipeline */}
      <Chapter2Pipeline />

      {/* Chapter 3: Live Intelligence Preview */}
      <Chapter3Preview />

      {/* Chapter 4: Classification */}
      <Chapter4Classification />

      {/* Sticky Footer */}
      <div className="sticky bottom-0 w-full flex justify-between items-center px-8 py-2 bg-[#0A0A0B]/90 backdrop-blur z-50 border-t border-[#1A1A1A]">
        <span className="font-mono text-[10px] text-[#8A8D91]">© 2024 ACOUSTIC SHIELD // SIGNAL INTEL</span>
        <div className="flex gap-4 font-mono text-[10px] text-[#8A8D91]">
          <span>SYSTEM STATUS: NOMINAL</span>
          <span>LAT: 34.0522 N</span>
          <span>LONG: 118.2437 W</span>
        </div>
      </div>
    </div>
  );
};
