import React from 'react';
import { Home, User, PlusSquare, Compass } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  openCreateModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, openCreateModal }) => {
  const navItems = [
    { id: ViewState.FEED, label: 'Feed', icon: <Home size={24} /> },
    { id: ViewState.PROFILE, label: 'Profile', icon: <User size={24} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-lumina-bg border-r border-white/5 p-6 z-40">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
            <Compass className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Lumina
          </h1>
        </div>

        <nav className="flex-1 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                currentView === item.id
                  ? 'bg-lumina-accent text-white shadow-lg shadow-violet-900/20'
                  : 'text-lumina-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={openCreateModal}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-lumina-muted hover:bg-white/5 hover:text-white transition-all duration-300 mt-4 group"
          >
             <div className="p-1 border-2 border-lumina-muted group-hover:border-white rounded-lg">
                <PlusSquare size={20} />
             </div>
             <span className="font-medium">Create</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
             <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">Guest User</span>
                <span className="text-xs text-lumina-muted">@creative_soul</span>
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-lumina-bg/90 backdrop-blur-lg border-t border-white/10 p-4 z-50 flex justify-around items-center">
        <button 
          onClick={() => setView(ViewState.FEED)}
          className={`${currentView === ViewState.FEED ? 'text-lumina-accent' : 'text-lumina-muted'}`}
        >
          <Home size={28} />
        </button>
        
        <button 
          onClick={openCreateModal}
          className="bg-lumina-accent text-white p-3 rounded-full shadow-lg shadow-violet-500/30 transform -translate-y-4 border-4 border-lumina-bg"
        >
          <PlusSquare size={28} />
        </button>
        
        <button 
          onClick={() => setView(ViewState.PROFILE)}
          className={`${currentView === ViewState.PROFILE ? 'text-lumina-accent' : 'text-lumina-muted'}`}
        >
          <User size={28} />
        </button>
      </div>
    </>
  );
};