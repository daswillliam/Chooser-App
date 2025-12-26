
import React from 'react';
import { WheelOption } from '../types';

interface ResultModalProps {
  option: WheelOption;
  onClose: () => void;
  onRemove: () => void;
  showConfetti?: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({ option, onClose, onRemove }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-[2px]">
      <div className="bg-white rounded-[3rem] p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 italic">And the winner is...</p>
        <div className="p-10 rounded-[2.5rem] text-4xl font-extrabold mb-8 text-white shadow-lg" style={{ backgroundColor: option.color }}>
          {option.label}
        </div>
        <div className="space-y-3">
          <button onClick={onClose} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all">COOL!</button>
          <button onClick={onRemove} className="w-full py-4 text-slate-400 font-bold hover:text-rose-500 transition-colors text-sm">Aus Liste entfernen</button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
