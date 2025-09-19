
import React from 'react';
import { FilmIcon } from './icons/FilmIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center bg-cyan-500/10 p-4 rounded-full mb-4 border border-cyan-500/30">
        <FilmIcon className="h-12 w-12 text-cyan-400" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-cyan-400">
        StoryScript AI
      </h1>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Turn any topic into a compelling, data-driven story. Paste a link or upload a file to generate an engaging video script.
      </p>
    </header>
  );
};
