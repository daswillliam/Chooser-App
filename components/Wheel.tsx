
import React, { useState, useRef } from 'react';
import { WheelOption } from '../types';

interface WheelProps {
  options: WheelOption[];
  isSpinning: boolean;
  setSpinning: (spinning: boolean) => void;
  onSpinEnd: (option: WheelOption) => void;
}

const Wheel: React.FC<WheelProps> = ({ options, isSpinning, setSpinning, onSpinEnd }) => {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);

  const spin = () => {
    if (isSpinning || options.length < 2) return;
    setSpinning(true);
    const extraRounds = 7 + Math.random() * 5;
    const newRotation = rotation + extraRounds * 360 + Math.random() * 360;
    setRotation(newRotation);

    setTimeout(() => {
      const finalDeg = newRotation % 360;
      const sliceSize = 360 / options.length;
      const normalizedRotation = (360 - (finalDeg % 360) + 270) % 360;
      const index = Math.floor(normalizedRotation / sliceSize);
      onSpinEnd(options[index % options.length]);
    }, 4000);
  };

  const sliceSize = 360 / (options.length || 1);

  return (
    <div className="relative flex items-center justify-center w-full max-w-[340px] aspect-square mx-auto">
      <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <svg width="32" height="32" viewBox="0 0 32 32"><path d="M16 32L0 4H32L16 32Z" fill="#1e293b" /></svg>
      </div>
      <div className="relative w-full h-full bg-white rounded-full p-3 border-8 border-white shadow-xl shadow-slate-200/50">
        <svg 
          ref={wheelRef}
          viewBox="0 0 100 100" 
          className="w-full h-full transition-transform duration-[4000ms] ease-[cubic-bezier(0.15,0,0,1)] rounded-full"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {options.map((option, i) => {
            const startAngle = i * sliceSize;
            const endAngle = (i + 1) * sliceSize;
            const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
            const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
            const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
            const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
            return (
              <g key={option.id}>
                <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${sliceSize > 180 ? 1 : 0} 1 ${x2} ${y2} Z`} fill={option.color} stroke="white" strokeWidth="0.5" />
                <text x="78" y="50" fill="white" fontSize="4.5" fontWeight="800" transform={`rotate(${startAngle + sliceSize / 2}, 50, 50)`} textAnchor="middle">{option.label}</text>
              </g>
            );
          })}
        </svg>
        <button onClick={spin} disabled={isSpinning || options.length < 2} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 rounded-full font-black transition-all border-8 border-white shadow-lg ${isSpinning ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white active:scale-90'}`}>SPIN</button>
      </div>
    </div>
  );
};

export default Wheel;
