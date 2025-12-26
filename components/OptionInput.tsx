
import React, { useState } from 'react';
import { IconPlus } from './Icons';

const OptionInput: React.FC<{onAdd: (label: string) => void}> = ({ onAdd }) => {
  const [value, setValue] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) { onAdd(value.trim()); setValue(''); }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Neue Option..." className="flex-grow px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-100 focus:bg-white focus:outline-none font-bold text-slate-700 transition-all" />
      <button type="submit" className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-sm hover:bg-indigo-700 active:scale-95 transition-all">
        <IconPlus />
      </button>
    </form>
  );
};

export default OptionInput;
