import React from 'react';
import { DocumentIcon } from './icons/DocumentIcon';
import { WarningIcon } from './icons/WarningIcon';
import { SaveIcon } from './icons/SaveIcon';

interface OutputSectionProps {
  script: string | null;
  isLoading: boolean;
  error: string | null;
}

const ScriptPlaceholder: React.FC = () => (
  <div className="text-center text-slate-500 p-12">
    <DocumentIcon className="h-16 w-16 mx-auto text-slate-600" />
    <h3 className="mt-4 text-lg font-medium text-slate-400">Your script will appear here</h3>
    <p className="mt-1 text-sm">Provide a source and click "Generate Script" to start.</p>
  </div>
);

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-6 p-6 animate-pulse">
    <div className="h-6 bg-slate-700 rounded-md w-1/4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-700 rounded-md w-full"></div>
      <div className="h-4 bg-slate-700 rounded-md w-5/6"></div>
      <div className="h-4 bg-slate-700 rounded-md w-full"></div>
    </div>
    <div className="h-6 bg-slate-700 rounded-md w-1/3 mt-6"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-700 rounded-md w-3/4"></div>
      <div className="h-4 bg-slate-700 rounded-md w-1/2"></div>
    </div>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-lg flex items-start space-x-3">
    <WarningIcon className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
    <div>
      <h4 className="font-bold">Generation Failed</h4>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

const FormattedScript: React.FC<{ script: string }> = ({ script }) => {
  // Split the script by the markdown-style tags. This creates an array
  // where tags and their content are alternating elements.
  const parts = script.split(/(\*\*\[(?:SCENE START|NARRATOR|INFOGRAPHIC IDEA|KEY STATISTIC|INTERACTIVE ELEMENT|SCENE END)\]\*\*)/g)
                      .filter(part => part && part.trim() !== '');

  const renderedComponents = [];

  for (let i = 0; i < parts.length; i++) {
    const currentPart = parts[i];
    // Content is the part immediately following the tag.
    const content = (parts[i + 1] || '').trim();

    if (currentPart.includes('[SCENE START]')) {
      renderedComponents.push(
        <div key={i} className="pt-4 mt-4 first:mt-0 first:pt-0 border-t border-slate-700 first:border-t-0">
          <h2 className="text-cyan-400 font-bold text-xl mb-2">SCENE START</h2>
          <p className="text-slate-400 italic">{content}</p>
        </div>
      );
      i++; // Increment to skip the content part on the next loop
    } else if (currentPart.includes('[NARRATOR]')) {
      renderedComponents.push(
        <div key={i} className="mt-4">
          <strong className="text-slate-100 font-semibold">NARRATOR</strong>
          <p className="pl-4 border-l-2 border-slate-600 mt-1 text-slate-300">{content}</p>
        </div>
      );
      i++;
    } else if (currentPart.includes('[INFOGRAPHIC IDEA]')) {
      renderedComponents.push(
        <div key={i} className="mt-4 bg-sky-900/40 border-l-4 border-sky-500 p-4 rounded-r-md">
          <strong className="text-sky-400 font-bold block mb-1">INFOGRAPHIC IDEA</strong>
          <p>{content}</p>
        </div>
      );
      i++;
    } else if (currentPart.includes('[KEY STATISTIC]')) {
      renderedComponents.push(
        <div key={i} className="mt-4 bg-amber-900/40 border-l-4 border-amber-500 p-4 rounded-r-md">
          <strong className="text-amber-400 font-bold block mb-1">KEY STATISTIC</strong>
          <p>{content}</p>
        </div>
      );
      i++;
    } else if (currentPart.includes('[INTERACTIVE ELEMENT]')) {
      renderedComponents.push(
        <div key={i} className="mt-4 bg-violet-900/40 border-l-4 border-violet-500 p-4 rounded-r-md">
          <strong className="text-violet-400 font-bold block mb-1">INTERACTIVE ELEMENT</strong>
          <p>{content}</p>
        </div>
      );
      i++;
    } else if (currentPart.includes('[SCENE END]')) {
      renderedComponents.push(
        <div key={i} className="flex items-center justify-center my-6" aria-hidden="true">
          <div className="w-1/3 border-b border-slate-700"></div>
          <span className="text-xs text-slate-500 px-3">SCENE END</span>
          <div className="w-1/3 border-b border-slate-700"></div>
        </div>
      );
    } else {
      // This handles any text that is not preceded by a known tag.
      renderedComponents.push(<p key={i} className="mt-4 first:mt-0">{currentPart.trim()}</p>);
    }
  }

  return (
    <div className="text-base text-slate-300 leading-relaxed p-6">
      {renderedComponents}
    </div>
  );
};


export const OutputSection: React.FC<OutputSectionProps> = ({ script, isLoading, error }) => {
  const handleSaveScript = () => {
    if (!script) return;
    const blob = new Blob([script], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'story-script.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 bg-slate-800/50 rounded-2xl border border-slate-700 min-h-[300px] overflow-hidden flex flex-col">
      {isLoading && <LoadingSkeleton />}
      {!isLoading && error && <div className="p-6"><ErrorDisplay message={error} /></div>}
      {!isLoading && !error && script && (
        <>
          <div className="flex justify-between items-center px-6 py-4 border-b border-slate-700 flex-shrink-0">
            <h3 className="text-lg font-semibold text-slate-200">Generated Script</h3>
            <button
              onClick={handleSaveScript}
              className="flex items-center gap-2 rounded-md bg-slate-700/50 px-3 py-1.5 text-sm font-semibold text-slate-300 ring-1 ring-inset ring-slate-700 hover:bg-slate-700 transition-colors duration-200"
              aria-label="Save generated script"
            >
              <SaveIcon className="h-4 w-4" />
              <span>Save Script</span>
            </button>
          </div>
          <div className="overflow-y-auto flex-grow">
            <FormattedScript script={script} />
          </div>
        </>
      )}
      {!isLoading && !error && !script && (
        <div className="flex-grow flex items-center justify-center">
          <ScriptPlaceholder />
        </div>
      )}
    </div>
  );
};