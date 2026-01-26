import { useState } from 'react';

interface PushButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

type AnimationPhase = 'idle' | 'pushing' | 'popping';

export default function PushButton({
  label,
  onClick,
  disabled = false,
  className = '',
}: PushButtonProps) {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [showActivated, setShowActivated] = useState(false);

  const handleClick = () => {
    if (disabled || animationPhase !== 'idle') return;

    setAnimationPhase('pushing');

    // After push down animation (200ms), show activated image and pop up
    setTimeout(() => {
      setShowActivated(true);
      setAnimationPhase('popping');
    }, 200);

    // After pop up animation completes (300ms), trigger the callback
    setTimeout(() => {
      onClick();
      // Reset state after navigation
      setTimeout(() => {
        setAnimationPhase('idle');
        setShowActivated(false);
      }, 100);
    }, 500);
  };

  const getTopLayerAnimation = () => {
    if (animationPhase === 'pushing') return 'animate-push-down';
    if (animationPhase === 'popping') return 'animate-pop-up';
    return '';
  };

  // Use shared images: bg.png for background, normal.png / active.png for top layer
  const topImage = showActivated ? '/active.png' : '/normal.png';

  return (
    <button
      onClick={handleClick}
      disabled={disabled || animationPhase !== 'idle'}
      className={`push-button ${animationPhase !== 'idle' ? 'animating' : ''} ${className}`}
    >
      {/* Background layer - static */}
      <img
        src="/bg.png"
        alt=""
        className="push-button-bg"
        draggable={false}
      />
      {/* Top layer - animates */}
      <img
        src={topImage}
        alt=""
        className={`push-button-top ${getTopLayerAnimation()}`}
        draggable={false}
      />
      {/* Text label - on top of everything */}
      <span className={`push-button-label ${getTopLayerAnimation()}`}>
        {label}
      </span>
    </button>
  );
}
