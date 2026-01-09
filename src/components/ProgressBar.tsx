import React from 'react';

interface ProgressBarProps {
  progress: number;
  totalContents: number;
  currentContentIndex: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  totalContents,
  currentContentIndex,
}) => {
  return (
    <div className="w-full px-2 py-2 bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex gap-1">
        {Array.from({ length: totalContents }).map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-100"
              style={{
                width:
                  index < currentContentIndex
                    ? '100%'
                    : index === currentContentIndex
                      ? `${progress}%`
                      : '0%',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

