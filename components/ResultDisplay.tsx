
import React from 'react';
import type { WasteClassification, LocalizedStrings } from '../types';
import { GlassIcon } from './icons/GlassIcon';
import { MetalIcon } from './icons/MetalIcon';
import { OrganicIcon } from './icons/OrganicIcon';
import { PaperIcon } from './icons/PaperIcon';
import { PlasticIcon } from './icons/PlasticIcon';
import { OtherIcon } from './icons/OtherIcon';

interface ResultDisplayProps {
  result: WasteClassification | null;
  isLoading: boolean;
  error: string | null;
  strings: LocalizedStrings;
}

const WasteIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconProps = { className: "w-12 h-12" };
  switch (type) {
    case 'Plastic': return <PlasticIcon {...iconProps} />;
    case 'Metal': return <MetalIcon {...iconProps} />;
    case 'Paper': return <PaperIcon {...iconProps} />;
    case 'Organic': return <OrganicIcon {...iconProps} />;
    case 'Glass': return <GlassIcon {...iconProps} />;
    default: return <OtherIcon {...iconProps} />;
  }
};

const SkeletonLoader: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
        <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-16 bg-gray-300 rounded w-full"></div>
        </div>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, error, strings }) => {
  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }
    if (error) {
      return (
        <div className="text-center py-10">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      );
    }
    if (result) {
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{strings.wasteType}</h3>
            <div className="flex items-center mt-2 space-x-4">
              <WasteIcon type={result.wasteType} />
              <p className="text-3xl font-bold text-green-800">{result.wasteType}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{strings.sortingInstruction}</h3>
            <p className="mt-2 text-lg text-gray-800 bg-green-100 p-4 rounded-lg border-l-4 border-green-500">{result.sortingInstruction}</p>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-lg">
            <h3 className="font-bold flex items-center"><i className="fas fa-lightbulb mr-2"></i>{strings.educationalTip}</h3>
            <p className="mt-1 text-sm">{result.educationalTip}</p>
          </div>
        </div>
      );
    }
    return (
        <div className="text-center py-10 flex flex-col items-center justify-center h-full">
            <i className="fas fa-inbox text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">{strings.initialPrompt}</p>
        </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full min-h-[400px]">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">{strings.resultTitle}</h2>
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};
