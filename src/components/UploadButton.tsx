import React, { useRef } from 'react';
import { Plus } from 'lucide-react';

interface UploadButtonProps {
  onUpload: (file: File) => Promise<void>;
  isLoading?: boolean;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  isLoading = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        await onUpload(e.target.files[0]);
        // Reset input
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error uploading story:', error);
      }
    }
  };

  return (
    <div className="flex-shrink-0">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={isLoading}
        className="hidden"
        id="story-upload"
      />
      <label
        htmlFor="story-upload"
        className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-400 bg-white hover:border-gray-600 hover:bg-gray-50 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
      >
        <Plus className="w-8 h-8 text-gray-700" />
      </label>
    </div>
  );
};

