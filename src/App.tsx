import { useState } from 'react';
import StartScreen from './components/StartScreen';
import ButtonSelectionScreen from './components/ButtonSelectionScreen';
import SubButtonScreen from './components/SubButtonScreen';
import VideoPlayerScreen from './components/VideoPlayerScreen';
import type { Screen } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

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
