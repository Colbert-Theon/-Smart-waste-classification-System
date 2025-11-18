
import React from 'react';
import type { Language } from '../types';
import { LANGUAGES } from '../constants';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <i className="fas fa-recycle text-3xl text-green-600"></i>
          <h1 className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">Smart Waste Sorter</h1>
        </div>
        <div className="relative">
          <select
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="appearance-none bg-gray-200 border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
            aria-label="Select language"
          >
            {LANGUAGES.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
             <i className="fas fa-chevron-down text-xs"></i>
          </div>
        </div>
      </div>
    </header>
  );
};
