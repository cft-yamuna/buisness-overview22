import { useState } from "react";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [activated, setActivated] = useState(false);

  const handleStart = () => {
    if (activated) return; // prevent double click
    setActivated(true);
    onStart();
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <button
          onClick={handleStart}
          disabled={activated}
          className="transform transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <img
            src="/start.png"
            alt="Start"
            style={{ width: '756.61px', height: '182.48px' }}
          />
        </button>
      </div>
    </div>
  );
}
