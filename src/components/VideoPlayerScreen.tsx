import { useEffect, useRef, useState } from 'react';

interface VideoPlayerScreenProps {
  videoFile: string;
  onVideoEnd: () => void;
  onBack: () => void;
  onHome: () => void;
}

type AnimationPhase = 'idle' | 'pushing' | 'popping';

export default function VideoPlayerScreen({
  videoFile,
  onVideoEnd,
  onBack,
  onHome,
}: VideoPlayerScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [backAnimationPhase, setBackAnimationPhase] = useState<AnimationPhase>('idle');
  const [homeAnimationPhase, setHomeAnimationPhase] = useState<AnimationPhase>('idle');
  const [backShowActivated, setBackShowActivated] = useState(false);
  const [homeShowActivated, setHomeShowActivated] = useState(false);

  useEffect(() => {
    videoRef.current?.play();
  }, [videoFile]);

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

  const handleHomeClick = () => {
    if (homeAnimationPhase !== 'idle') return;

    setHomeAnimationPhase('pushing');

    setTimeout(() => {
      setHomeShowActivated(true);
      setHomeAnimationPhase('popping');
    }, 200);

    setTimeout(() => {
      onHome();
      setTimeout(() => {
        setHomeAnimationPhase('idle');
        setHomeShowActivated(false);
      }, 100);
    }, 500);
  };

  const getTopLayerAnimation = (phase: AnimationPhase) => {
    if (phase === 'pushing') return 'animate-push-down';
    if (phase === 'popping') return 'animate-pop-up';
    return '';
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      {/* Video - Behind buttons */}
      <video
        ref={videoRef}
        onEnded={onVideoEnd}
        className="absolute inset-0 w-full h-full object-contain z-10"
      >
        <source src={`/${videoFile}`} type="video/mp4" />
      </video>

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

      {/* Home Button - Bottom Right */}
      <div style={{ position: 'fixed', bottom: '20px', right: '50px', zIndex: 50 }}>
        <button
          onClick={handleHomeClick}
          disabled={homeAnimationPhase !== 'idle'}
          className={`push-button ${homeAnimationPhase !== 'idle' ? 'animating' : ''}`}
        >
          <img
            src="/homebg.png"
            alt=""
            className="push-button-bg"
            style={{ width: '170px', height: '44px' }}
            draggable={false}
          />
          <img
            src={homeShowActivated ? "/homea.png" : "/homeupper.png"}
            alt="Home"
            className={`push-button-top ${getTopLayerAnimation(homeAnimationPhase)}`}
            style={{ width: '155px', height: 'auto' }}
            draggable={false}
          />
        </button>
      </div>
    </div>
  );
}
