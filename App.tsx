
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { StatsDashboard } from './components/StatsDashboard';
import type { Language, WasteClassification, WasteStats } from './types';
import { classifyWaste } from './services/geminiService';
import { LOCALIZED_STRINGS } from './constants';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<WasteClassification | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<WasteStats>({ totalScans: 0 });

  const currentStrings = LOCALIZED_STRINGS[language];

  const loadStats = useCallback(() => {
    try {
      const savedStats = localStorage.getItem('wasteStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      } else {
        setStats({ totalScans: 0 });
      }
    } catch (err) {
      console.error("Failed to load stats from localStorage", err);
      setStats({ totalScans: 0 });
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);
  
  const updateStats = (wasteType: string) => {
    setStats(prevStats => {
      const newStats = {
        ...prevStats,
        totalScans: (prevStats.totalScans || 0) + 1,
        [wasteType]: (prevStats[wasteType] || 0) + 1,
      };
      localStorage.setItem('wasteStats', JSON.stringify(newStats));
      return newStats;
    });
  };

  const handleImageChange = async (file: File) => {
    if (!file) return;

    setSelectedImage(file);
    setImageUrl(URL.createObjectURL(file));
    setClassificationResult(null);
    setError(null);
    setIsLoading(true);

    try {
      const result = await classifyWaste(file, language);
      setClassificationResult(result);
      if(result.wasteType !== "Uncertain") {
        updateStats(result.wasteType);
      }
    } catch (err) {
      console.error(err);
      setError(currentStrings.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setClassificationResult(null);
    setError(null);
  };
  
  const handleReset = () => {
    setSelectedImage(null);
    setImageUrl(null);
    setClassificationResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header 
        currentLanguage={language} 
        onLanguageChange={handleLanguageChange}
        title={currentStrings.title} 
      />
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800">{currentStrings.title}</h1>
          <p className="mt-2 text-md sm:text-lg text-gray-600 max-w-3xl mx-auto">{currentStrings.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ImageUploader 
            onImageChange={handleImageChange}
            imageUrl={imageUrl}
            onReset={handleReset}
            strings={currentStrings}
            isLoading={isLoading}
          />
          <ResultDisplay
            result={classificationResult}
            isLoading={isLoading}
            error={error}
            strings={currentStrings}
          />
        </div>

        <StatsDashboard stats={stats} strings={currentStrings} onRefresh={loadStats} />
      </main>
      <footer className="text-center py-6 bg-gray-100 mt-8 border-t">
        <p className="text-gray-500 text-sm">
          {currentStrings.footer}
        </p>
      </footer>
    </div>
  );
};

export default App;
