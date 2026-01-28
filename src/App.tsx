import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import ButtonSelectionScreen from './components/ButtonSelectionScreen';
import SubButtonScreen from './components/SubButtonScreen';
import VideoPlayerScreen from './components/VideoPlayerScreen';
import type { Screen } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Disable right-click context menu and zoom
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleSelectCategory = (categoryNumber: number) => {
    setSelectedCategory(categoryNumber);
    setCurrentScreen('subButtons');
  };

  const handleSelectVideo = (videoFile: string) => {
    setSelectedVideo(videoFile);
    setCurrentScreen('video');
  };

  const handleVideoEnd = () => {
    setCurrentScreen('subButtons');
    setSelectedVideo(null);
  };

  const handleGoHome = () => {
    setCurrentScreen('start');
    setSelectedCategory(null);
    setSelectedVideo(null);
  };

  const handleGoBack = () => {
    if (currentScreen === 'video') {
      setCurrentScreen('subButtons');
      setSelectedVideo(null);
    } else if (currentScreen === 'subButtons') {
      setCurrentScreen('buttons');
      setSelectedCategory(null);
    }
  };

  const handleBackToCategories = () => {
    setCurrentScreen('buttons');
    setSelectedCategory(null);
  };

  const handleStart = () => {
    setCurrentScreen('buttons');
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStart} />
      )}

      {currentScreen === 'buttons' && (
        <ButtonSelectionScreen
          onSelectCategory={handleSelectCategory}
          onBack={handleGoHome}
        />
      )}

      {currentScreen === 'subButtons' && selectedCategory && (
        <SubButtonScreen
          categoryNumber={selectedCategory}
          onSelectVideo={handleSelectVideo}
          onBack={handleBackToCategories}
          onHome={handleGoHome}
        />
      )}

      {currentScreen === 'video' && selectedVideo && (
        <VideoPlayerScreen
          videoFile={selectedVideo}
          onVideoEnd={handleVideoEnd}
          onBack={handleGoBack}
          onHome={handleGoHome}
        />
      )}
    </div>
  );
}

export default App;
