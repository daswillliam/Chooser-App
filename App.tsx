
import React, { useState } from 'react';
import { WheelOption, Friend, Tab, AppSettings } from './types';
import Wheel from './components/Wheel';
import OptionInput from './components/OptionInput';
import FriendsTab from './components/FriendsTab';
import SettingsTab from './components/SettingsTab';
import ResultModal from './components/ResultModal';
import { IconUsers, IconWheel, IconSettings } from './components/Icons';

const COLORS = [
  '#FF5F7E', '#4D96FF', '#6BCB77', '#FFD93D', '#A084DC', 
  '#FF9F45', '#00C897', '#F473B9', '#6366F1', '#14B8A6'
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.WHEEL);
  const [options, setOptions] = useState<WheelOption[]>([
    { id: '1', label: 'Pizza', color: COLORS[0] },
    { id: '2', label: 'Burger', color: COLORS[1] },
    { id: '3', label: 'Sushi', color: COLORS[2] },
    { id: '4', label: 'Pasta', color: COLORS[3] },
  ]);
  const [friends, setFriends] = useState<Friend[]>([
    { id: 'f1', name: 'Lukas', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lukas' },
    { id: 'f2', name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  ]);
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    confettiEnabled: true,
    primaryColor: '#6366F1',
  });

  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<WheelOption | null>(null);

  const addOption = (label: string) => {
    const newOption: WheelOption = {
      id: Math.random().toString(36).substr(2, 9),
      label: label,
      color: COLORS[options.length % COLORS.length]
    };
    setOptions([...options, newOption]);
  };

  const removeOption = (id: string) => {
    setOptions(options.filter(o => o.id !== id));
  };

  const handleSpinEnd = (selectedOption: WheelOption) => {
    setSpinning(false);
    setResult(selectedOption);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="pt-10 pb-6 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Lucky Wheel</h1>
        <p className="text-slate-400 font-semibold text-sm mt-1 uppercase tracking-widest">Decision Maker</p>
      </header>

      <main className="flex-grow px-5 pb-32 max-w-lg mx-auto w-full">
        {activeTab === Tab.WHEEL && (
          <div className="space-y-10">
            <div className="py-4">
              <Wheel 
                options={options} 
                onSpinEnd={handleSpinEnd} 
                isSpinning={spinning} 
                setSpinning={setSpinning}
              />
            </div>

            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xl font-bold text-slate-800">Optionen</h2>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                  {options.length} Items
                </span>
              </div>
              
              <OptionInput onAdd={addOption} />

              <div className="mt-8 space-y-3 max-h-[35vh] overflow-y-auto pr-1">
                {options.map((opt) => (
                  <div key={opt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group transition-all hover:bg-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-lg" style={{ backgroundColor: opt.color }}></div>
                      <span className="font-bold text-slate-700">{opt.label}</span>
                    </div>
                    <button 
                      onClick={() => removeOption(opt.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === Tab.FRIENDS && <FriendsTab friends={friends} setFriends={setFriends} />}
        {activeTab === Tab.SETTINGS && <SettingsTab settings={settings} setSettings={setSettings} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-4 pb-8 flex justify-between items-center z-40">
        <NavButton 
          active={activeTab === Tab.FRIENDS} 
          onClick={() => setActiveTab(Tab.FRIENDS)}
          label="Crew"
          icon={<IconUsers />}
        />
        <NavButton 
          active={activeTab === Tab.WHEEL} 
          onClick={() => setActiveTab(Tab.WHEEL)}
          label="Spin"
          icon={<IconWheel />}
        />
        <NavButton 
          active={activeTab === Tab.SETTINGS} 
          onClick={() => setActiveTab(Tab.SETTINGS)}
          label="Setup"
          icon={<IconSettings />}
        />
      </nav>

      {result && (
        <ResultModal 
          option={result} 
          onClose={() => setResult(null)} 
          onRemove={() => {
            removeOption(result.id);
            setResult(null);
          }}
          showConfetti={settings.confettiEnabled}
        />
      )}
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-20 py-2 rounded-2xl transition-all duration-300 ${
      active ? 'bg-indigo-50 text-indigo-600 scale-105' : 'text-slate-400'
    }`}
  >
    <div className="mb-1">{icon}</div>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default App;
