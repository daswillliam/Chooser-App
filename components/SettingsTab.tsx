
import React from 'react';
import { AppSettings } from '../types';

const SettingsTab: React.FC<{settings: AppSettings, setSettings: any}> = ({ settings, setSettings }) => {
  const toggle = (k: keyof AppSettings) => setSettings((s: any) => ({ ...s, [k]: !s[k] }));
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
      <h2 className="text-2xl font-black text-slate-800 mb-8">Setup</h2>
      <div className="space-y-4">
        {['soundEnabled', 'confettiEnabled'].map((k: any) => (
          <div key={k} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl">
            <span className="font-bold text-slate-800 uppercase text-sm tracking-wide">{k === 'soundEnabled' ? 'Audio' : 'Konfetti'}</span>
            <button onClick={() => toggle(k)} className={`w-14 h-8 rounded-full p-1 transition-all ${settings[k as keyof AppSettings] ? 'bg-indigo-600' : 'bg-slate-200'}`}>
              <div className={`w-6 h-6 rounded-full bg-white transition-transform ${settings[k as keyof AppSettings] ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsTab;
