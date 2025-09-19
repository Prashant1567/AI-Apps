
import React from 'react';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { UploadIcon } from './icons/UploadIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface InputSectionProps {
  youtubeUrl: string;
  onUrlChange: (url: string) => void;
  file: File | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  youtubeUrl,
  onUrlChange,
  file,
  onFileChange,
  onGenerate,
  isLoading,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileLabelClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YouTube URL Input */}
        <div>
          <label htmlFor="youtube-url" className="block text-sm font-medium text-slate-300 mb-2">
            YouTube Link
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <YouTubeIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="youtube-url"
              value={youtubeUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="block w-full rounded-md border-0 bg-slate-900/80 py-2.5 pl-10 pr-3 text-slate-200 ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Or Upload Document
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
            accept=".docx,.pdf,.jpeg,.jpg,.png,.txt,.xml"
            disabled={isLoading}
          />
          <button
            onClick={handleFileLabelClick}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-md bg-slate-700/50 px-3 py-2.5 text-sm font-semibold text-slate-300 ring-1 ring-inset ring-slate-700 hover:bg-slate-700 transition-colors duration-200 disabled:opacity-50"
          >
            <UploadIcon className="h-5 w-5" />
            <span>{file ? file.name : 'Choose a file'}</span>
          </button>
        </div>
      </div>
      
      {/* Separator */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-slate-700"></div>
        <span className="flex-shrink mx-4 text-slate-500 text-xs">AND</span>
        <div className="flex-grow border-t border-slate-700"></div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isLoading || (!youtubeUrl && !file)}
        className="w-full flex items-center justify-center gap-2.5 rounded-md bg-cyan-500 px-3.5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
      >
        {isLoading ? (
          <>
            <LoadingSpinner className="h-5 w-5" />
            <span>Generating Script...</span>
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5" />
            <span>Generate Script</span>
          </>
        )}
      </button>
    </div>
  );
};
