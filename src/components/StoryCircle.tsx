import React from 'react';

interface StoryCircleProps {
  imageUrl: string;
  onClick: () => void;
  hasContent: boolean;
  contentCount?: number;
}

export const StoryCircle: React.FC<StoryCircleProps> = ({
  imageUrl,
  onClick,
  hasContent,
  contentCount = 1,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative flex-shrink-0 w-16 h-16 rounded-full border-2 border-gray-400 overflow-hidden focus:outline-none focus:ring-2 focus:ring-gray-800 transition-all hover:border-gray-600 active:scale-95"
    >
      {hasContent ? (
        <>
          <img
            src={imageUrl}
            alt="Story"
            className="w-full h-full object-cover"
          />
          {contentCount > 1 && (
            <div className="absolute bottom-0 right-0 bg-gray-900 text-white text-xs px-1 rounded-tl">
              {contentCount}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}
    </button>
  );
};

