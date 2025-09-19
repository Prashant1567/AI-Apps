
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { generateScriptFromContent } from './services/geminiService';
import type { FileInfo } from './types';

const App: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const [meta, base64Data] = dataUrl.split(',');
        const mimeType = meta.split(':')[1].split(';')[0];
        setFileInfo({ data: base64Data, mimeType });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setFileInfo(null);
    }
  };

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setFileInfo(null);
  }, []);

  const handleGenerateScript = useCallback(async () => {
    if (!youtubeUrl && !fileInfo) {
      setError("Please provide a YouTube URL or upload a document to begin.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedScript(''); // Initialize with empty string for streaming

    try {
      const stream = await generateScriptFromContent(youtubeUrl, fileInfo);
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          setGeneratedScript((prev) => (prev ?? '') + chunkText);
        }
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(`An error occurred: ${err.message}. Please check your API key and try again.`);
      } else {
        setError("An unknown error occurred.");
      }
      setGeneratedScript(null); // Reset on error
    } finally {
      setIsLoading(false);
    }
  }, [youtubeUrl, fileInfo]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <InputSection
            youtubeUrl={youtubeUrl}
            onUrlChange={setYoutubeUrl}
            file={file}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
            onGenerate={handleGenerateScript}
            isLoading={isLoading}
          />
          <OutputSection
            script={generatedScript}
            isLoading={isLoading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default App;