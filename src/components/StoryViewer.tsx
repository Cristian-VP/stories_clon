import React, { useEffect } from 'react';
import { useStories } from '../context/StoriesContext';
import { useStoryTimer } from '../hooks/useStoryTimer';
import { useGestures } from '../hooks/useGestures';
import { ProgressBar } from './ProgressBar';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const StoryViewer: React.FC = () => {
  const {
    stories,
    currentStoryIndex,
    currentContentIndex,
    isViewerOpen,
    closeViewer,
    nextContent,
    prevContent,
  } = useStories();

  const currentStory = stories[currentStoryIndex];
  const currentContent = currentStory?.contents?.[currentContentIndex];
  const currentDuration = currentContent?.duration ?? 3000;

  const { progress, pause, resume, reset } = useStoryTimer({
    onTimeComplete: nextContent,
    duration: currentDuration,
    isActive: isViewerOpen,
  });

  const { handleTouchStart, handleTouchEnd } = useGestures({
    onTapLeft: prevContent,
    onTapRight: nextContent,
    onSwipeDown: closeViewer,
    onPause: pause,
    onResume: resume,
  });

  // Reset timer cuando cambia el contenido
  useEffect(() => {
    if (isViewerOpen) {
      reset();
    }
  }, [currentContentIndex, currentStoryIndex, isViewerOpen, reset]);

  if (!isViewerOpen || stories.length === 0) {
    return null;
  }

  if (!currentStory || !currentStory.contents || currentStory.contents.length === 0) {
    return null;
  }

  const totalContents = currentStory.contents.length;

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress Bar */}
      <ProgressBar
        progress={progress}
        totalContents={totalContents}
        currentContentIndex={currentContentIndex}
      />

      {/* Close Button */}
      <button
        onClick={closeViewer}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-white"
        aria-label="Close viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Story Counter */}
      <div className="absolute top-4 left-4 z-10 text-white text-sm font-medium bg-black/30 px-2 py-1 rounded">
        {currentContentIndex + 1} / {totalContents}
      </div>

      {/* Story Image */}
      <div className="flex-1 flex items-center justify-center w-full h-full overflow-hidden">
        <img
          src={currentContent.imageUrl}
          alt={`Story ${currentStoryIndex + 1} - Content ${currentContentIndex + 1}`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Navigation Zones (invisible but interactive for click) */}
      <div className="absolute inset-0 flex pointer-events-none">
        {/* Left zone - Previous content */}
        <div
          className="w-1/3 pointer-events-auto cursor-pointer"
          onClick={prevContent}
        />

        {/* Middle zone - Pause/Resume */}
        <div className="w-1/3 pointer-events-auto" />

        {/* Right zone - Next content */}
        <div
          className="w-1/3 pointer-events-auto cursor-pointer"
          onClick={nextContent}
        />
      </div>

      {/* Navigation buttons (visible on hover for desktop) */}
      {(currentContentIndex > 0 || currentStoryIndex > 0) && (
        <button
          onClick={prevContent}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-white opacity-0 hover:opacity-100"
          aria-label="Previous content"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {(currentContentIndex < totalContents - 1 || currentStoryIndex < stories.length - 1) && (
        <button
          onClick={nextContent}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-white opacity-0 hover:opacity-100"
          aria-label="Next content"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
