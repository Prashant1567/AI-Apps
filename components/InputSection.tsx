import React from 'react';
import { YouTubeIcon } from './icons/YouTubeIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { DocumentIcon } from './icons/DocumentIcon';
import { XIcon } from './icons/XIcon';
import { PlusIcon } from './icons/PlusIcon';

interface InputSectionProps {
  youtubeUrl: string;
  onUrlChange: (url: string) => void;
  file: File | null;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  youtubeUrl,
  onUrlChange,
  file,
  onFileChange,
  onRemoveFile,
  onGenerate,
  isLoading,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileLabelClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveFileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveFile();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center w-full bg-slate-800/70 border border-slate-700 rounded-full p-1.5 shadow-lg backdrop-blur-sm">
        
        {/* YouTube URL Input */}
        <div className="flex items-center flex-grow">
          <div className="pl-3 pr-2 text-slate-500 pointer-events-none">
            <YouTubeIcon className="h-6 w-6" />
          </div>
          <input
            type="text"
            id="youtube-url"
            value={youtubeUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Paste a YouTube link here"
            className="w-full bg-transparent focus:outline-none text-slate-200 placeholder:text-slate-500 text-sm"
            disabled={isLoading}
            aria-label="YouTube URL"
          />
        </div>

        {/* Divider */}
        <div className="h-7 w-px bg-slate-700 mx-2"></div>

        {/* File Upload Area */}
        <div className="flex-shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
            accept=".docx,.pdf,.jpeg,.jpg,.png,.txt,.xml"
            disabled={isLoading}
          />
          {file ? (
            <div className="flex items-center gap-2 bg-slate-700/60 rounded-full pl-3 pr-1 py-1 text-sm text-slate-200 ring-1 ring-slate-600/50">
              <DocumentIcon className="h-5 w-5 text-slate-400 flex-shrink-0" />
              <span className="font-medium truncate max-w-[120px] sm:max-w-[200px]">{file.name}</span>
              <button
                onClick={handleRemoveFileClick}
                disabled={isLoading}
                className="flex-shrink-0 ml-1 p-1 rounded-full text-slate-400 hover:bg-slate-600 hover:text-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:opacity-50"
                aria-label="Remove file"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
             <button
              onClick={handleFileLabelClick}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-full border border-dashed border-slate-600 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 px-4 py-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Upload a document"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="text-sm font-medium hidden md:inline">Upload Document</span>
            </button>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isLoading || (!youtubeUrl && !file)}
          className="ml-2 w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full bg-cyan-500 text-white shadow-md hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100"
          aria-label="Generate script"
        >
          {isLoading ? (
            <LoadingSpinner className="h-6 w-6" />
          ) : (
            <SparklesIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};