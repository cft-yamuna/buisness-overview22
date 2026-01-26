import { useState, useEffect } from 'react';
import PushButton from './PushButton';
import { SUB_BUTTONS } from '../types';

interface SubButtonScreenProps {
  categoryNumber: number;
  onSelectVideo: (videoFile: string) => void;
  onBack: () => void;
  onHome: () => void;
}

type AnimationPhase = 'idle' | 'pushing' | 'popping';

export default function SubButtonScreen({
  categoryNumber,
  onSelectVideo,
  onBack,
  onHome,
}: SubButtonScreenProps) {
  const [clickedButton, setClickedButton] = useState<number | null>(null);
  const [backAnimationPhase, setBackAnimationPhase] = useState<AnimationPhase>('idle');
  const [backShowActivated, setBackShowActivated] = useState(false);
  const buttons = SUB_BUTTONS[categoryNumber] || [];

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

    startTimer();

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

  const handleButtonClick = (buttonId: number, videoFile: string) => {
    if (clickedButton !== null) return;
    setClickedButton(buttonId);
    onSelectVideo(videoFile);
  };

  const handleBackClick = () => {
    if (backAnimationPhase !== 'idle') return;

    setBackAnimationPhase('pushing');

    setTimeout(() => {
      setBackShowActivated(true);
      setBackAnimationPhase('popping');
    }, 200);

    setTimeout(() => {
      onBack();
      setTimeout(() => {
        setBackAnimationPhase('idle');
        setBackShowActivated(false);
      }, 100);
    }, 500);
  };

  const getTopLayerAnimation = (phase: AnimationPhase) => {
    if (phase === 'pushing') return 'animate-push-down';
    if (phase === 'popping') return 'animate-pop-up';
    return '';
  };

  // Layout configuration based on category
  const getLayoutForCategory = () => {
    const buttonCount = buttons.length;

    // Category 1: 3 rows x 3 columns grid with last button centered
    if (categoryNumber === 1) {
      return (
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-3 gap-6">
            {buttons.slice(0, 6).map((btn) => (
              <PushButton
                key={btn.id}
                label={btn.label}
                onClick={() => handleButtonClick(btn.id, btn.videoFile)}
                disabled={clickedButton !== null}
              />
            ))}
          </div>
          <div className="flex justify-center">
            {buttons.slice(6).map((btn) => (
              <PushButton
                key={btn.id}
                label={btn.label}
                onClick={() => handleButtonClick(btn.id, btn.videoFile)}
                disabled={clickedButton !== null}
              />
            ))}
          </div>
        </div>
      );
    // Category 2: 3 rows x 3 columns grid with last 2 buttons centered
    } else if (categoryNumber === 2) {
      return (
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-3 gap-6">
            {buttons.slice(0, 3).map((btn) => (
              <PushButton
                key={btn.id}
                label={btn.label}
                onClick={() => handleButtonClick(btn.id, btn.videoFile)}
                disabled={clickedButton !== null}
              />
            ))}
          </div>
          <div className="flex gap-6 justify-center">
            {buttons.slice(3).map((btn) => (
              <PushButton
                key={btn.id}
                label={btn.label}
                onClick={() => handleButtonClick(btn.id, btn.videoFile)}
                disabled={clickedButton !== null}
              />
            ))}
          </div>
        </div>
      );
    // Category 3: 3 rows x 3 columns grid
    } else if (categoryNumber === 3) {
      return (
        <div className="grid grid-cols-3 gap-6">
          {buttons.map((btn) => (
            <PushButton
              key={btn.id}
              label={btn.label}
              onClick={() => handleButtonClick(btn.id, btn.videoFile)}
              disabled={clickedButton !== null}
            />
          ))}
        </div>
      );
    }

    // Default: simple grid
    return (
      <div className="flex gap-6 flex-wrap justify-center">
        {buttons.map((btn) => (
          <PushButton
            key={btn.id}
            label={btn.label}
            onClick={() => handleButtonClick(btn.id, btn.videoFile)}
            disabled={clickedButton !== null}
          />
        ))}
      </div>
    );
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

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
        {/* Sub-buttons */}
        {getLayoutForCategory()}

      </div>

      {/* Back Button - Bottom Left */}
      <div style={{ position: 'fixed', bottom: '20px', left: '50px', zIndex: 50 }}>
        <button
          onClick={handleBackClick}
          disabled={backAnimationPhase !== 'idle'}
          className={`push-button ${backAnimationPhase !== 'idle' ? 'animating' : ''}`}
        >
          <img
            src="/backbg.png"
            alt=""
            className="push-button-bg"
            style={{ width: '170px', height: '44px' }}
            draggable={false}
          />
          <img
            src={backShowActivated ? "/backa.png" : "/backupper.png"}
            alt="Back"
            className={`push-button-top ${getTopLayerAnimation(backAnimationPhase)}`}
            style={{ width: '155px', height: 'auto' }}
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}
