
import React, { useState } from 'react';
import { Friend } from '../types';
import { IconPlus } from './Icons';

const FriendsTab: React.FC<{friends: Friend[], setFriends: any}> = ({ friends, setFriends }) => {
  const [name, setName] = useState('');
  const add = (e: any) => {
    e.preventDefault();
    if (name) {
      setFriends([...friends, { id: Date.now().toString(), name, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` }]);
      setName('');
    }
  };
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-black text-slate-800 mb-6">Deine Crew</h2>
      <form onSubmit={add} className="flex gap-3 mb-10">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name..." className="flex-grow px-5 py-4 bg-slate-50 rounded-2xl focus:outline-none font-bold text-slate-700" />
        <button type="submit" className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-sm">
          <IconPlus />
        </button>
      </form>
      <div className="space-y-4">
        {friends.map(f => (
          <div key={f.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl transition-all hover:bg-slate-100">
            <img src={f.avatar} className="w-12 h-12 rounded-full bg-white border border-slate-200 p-0.5" alt={f.name} />
            <span className="font-bold text-slate-700">{f.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsTab;
