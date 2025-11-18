
import React from 'react';
import type { WasteStats, LocalizedStrings } from '../types';

interface StatsDashboardProps {
  stats: WasteStats;
  strings: LocalizedStrings;
  onRefresh: () => void;
}

const StatCard: React.FC<{ label: string; value: number | string; icon: string }> = ({ label, value, icon }) => (
    <div className="bg-white p-4 rounded-lg shadow flex items-center">
        <div className="bg-green-100 p-3 rounded-full mr-4">
            <i className={`fas ${icon} text-xl text-green-600`}></i>
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


export const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats, strings, onRefresh }) => {

  const handleSync = () => {
    alert(strings.syncMessage);
  };
  
  const { totalScans, ...wasteCategories } = stats;

  return (
    <div className="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">{strings.statsTitle}</h2>
        <div>
            <button 
                onClick={onRefresh} 
                className="text-gray-500 hover:text-gray-700 mr-4"
                aria-label="Refresh stats"
            >
                <i className="fas fa-sync-alt"></i>
            </button>
            <button 
                onClick={handleSync}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
                <i className="fas fa-cloud-upload-alt mr-2"></i>
                {strings.syncButton}
            </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label={strings.totalScans} value={totalScans || 0} icon="fa-recycle" />
          {Object.entries(wasteCategories).map(([key, value]) => (
            <StatCard key={key} label={key} value={value} icon="fa-trash-alt" />
          ))}
      </div>
    </div>
  );
};
