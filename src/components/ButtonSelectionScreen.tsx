import { useState, useEffect } from 'react';
import PushButton from './PushButton';
import { MAIN_CATEGORIES } from '../types';

interface ButtonSelectionScreenProps {
  onSelectCategory: (categoryNumber: number) => void;
  onBack: () => void;
}

export default function ButtonSelectionScreen({ onSelectCategory, onBack }: ButtonSelectionScreenProps) {
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;

    const startTimer = () => {
      inactivityTimer = setTimeout(() => {
        onBack();
      }, 60000); // 1 minute
    };

    const handleActivity = () => {
      clearTimeout(inactivityTimer);
      startTimer();
    };

    // Start initial timer
    startTimer();

    // Listen for activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [onBack]);

  const handleButtonClick = (categoryId: number) => {
    if (clickedButton !== null) return; // Prevent multiple clicks
    setClickedButton(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Layout: Our Businesses & Our Infrastructure on top, Our Vision below */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 p-8">
        {/* Top row (Our Businesses and Our Infrastructure) */}
        <div className="flex gap-8">
          <PushButton
            label={MAIN_CATEGORIES[0].label}
            onClick={() => handleButtonClick(MAIN_CATEGORIES[0].id)}
            disabled={clickedButton !== null}
          />

          <PushButton
            label={MAIN_CATEGORIES[2].label}
            onClick={() => handleButtonClick(MAIN_CATEGORIES[2].id)}
            disabled={clickedButton !== null}
          />
        </div>

        {/* Bottom button (Our Vision) */}
        <PushButton
          label={MAIN_CATEGORIES[1].label}
          onClick={() => handleButtonClick(MAIN_CATEGORIES[1].id)}
          disabled={clickedButton !== null}
        />
      </div>
    </div>
  );
}
