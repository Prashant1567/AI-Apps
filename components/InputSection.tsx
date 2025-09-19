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

  const getFileTypeDescription = (mimeType: string): string => {
    if (!mimeType) return 'File';
    if (mimeType.includes('pdf')) return 'PDF Document';
    if (mimeType.includes('vnd.openxmlformats-officedocument.wordprocessingml.document')) return 'Word Document';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'JPEG Image';
    if (mimeType.includes('png')) return 'PNG Image';
    if (mimeType.includes('plain')) return 'Text File';
    if (mimeType.includes('xml')) return 'XML File';
    return 'File';
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YouTube URL Input Box */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-center">
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
              className="block w-full rounded-md border-0 bg-slate-800 py-2.5 pl-10 pr-3 text-slate-200 ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* File Upload Box */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-center min-h-[98px]">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
            accept=".docx,.pdf,.jpeg,.jpg,.png,.txt,.xml"
            disabled={isLoading}
          />
          {file ? (
            <div>
               <label className="block text-sm font-medium text-slate-300 mb-2">
                Uploaded Document
              </label>
              <div className="flex items-center justify-between rounded-md bg-slate-700/60 pl-3 pr-2 py-2 text-sm text-slate-200 ring-1 ring-inset ring-slate-700 h-[46px]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <DocumentIcon className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  <div className="truncate">
                    <span className="font-semibold">{file.name}</span>
                    <span className="text-slate-400 text-xs ml-2 hidden sm:inline">{getFileTypeDescription(file.type)}</span>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFileClick}
                  disabled={isLoading}
                  className="flex-shrink-0 ml-2 p-1 rounded-full text-slate-400 hover:bg-slate-600 hover:text-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:opacity-50"
                  aria-label="Remove file"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
             <button
              onClick={handleFileLabelClick}
              disabled={isLoading}
              className="w-full h-full flex items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 p-4 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-slate-700 disabled:hover:text-slate-400"
            >
              <div className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                <PlusIcon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Upload Document</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Generate Button */}
      <div className="mt-6">
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
    </div>
  );
};