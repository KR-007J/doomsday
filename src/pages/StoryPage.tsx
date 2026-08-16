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
    </div>
  );
};
