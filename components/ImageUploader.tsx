
import React, { useCallback, useRef } from 'react';
import type { LocalizedStrings } from '../types';

interface ImageUploaderProps {
  onImageChange: (file: File) => void;
  imageUrl: string | null;
  onReset: () => void;
  strings: LocalizedStrings;
  isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, imageUrl, onReset, strings, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageChange(file);
    }
  }, [onImageChange]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">{strings.uploadTitle}</h2>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          disabled={isLoading}
        />
        {!imageUrl && (
          <label
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">{strings.uploadOrDrag}</span></p>
              <button
                type="button"
                onClick={triggerFileSelect}
                className="mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                disabled={isLoading}
              >
                {strings.uploadButton}
              </button>
            </div>
          </label>
        )}
        {imageUrl && (
          <div className="w-full h-auto min-h-64 rounded-lg overflow-hidden relative group">
            <img src={imageUrl} alt="Uploaded waste" className="w-full h-full object-contain" />
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isLoading ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-0 group-hover:bg-opacity-50'}`}>
                {isLoading ? (
                    <div className="text-center text-white">
                        <i className="fas fa-spinner fa-spin text-4xl"></i>
                        <p className="mt-2 font-semibold">{strings.classifying}</p>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={onReset}
                        className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-opacity opacity-0 group-hover:opacity-100"
                    >
                        {strings.changeImageButton}
                    </button>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
