import React from 'react';
import { Files, Search, GitGraph, Play, Settings, Menu } from 'lucide-react';

interface SidebarProps {
  onRun: () => void;
  isCompiling: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onRun, isCompiling }) => {
  return (
    <div className="w-12 bg-[#333333] flex flex-col items-center py-2 justify-between border-r border-[#1e1e1e] select-none">
      <div className="flex flex-col gap-6">
         <div className="cursor-pointer p-2 hover:bg-[#2a2d2e] rounded-md group relative">
           <Menu size={24} className="text-[#858585] group-hover:text-white" />
        </div>
        <div className="cursor-pointer p-2 border-l-2 border-white">
           <Files size={24} className="text-white" />
        </div>
        <div className="cursor-pointer p-2 hover:bg-[#2a2d2e] rounded-md group">
           <Search size={24} className="text-[#858585] group-hover:text-white" />
        </div>
        <div className="cursor-pointer p-2 hover:bg-[#2a2d2e] rounded-md group">
           <GitGraph size={24} className="text-[#858585] group-hover:text-white" />
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-2">
         <div 
            onClick={!isCompiling ? onRun : undefined}
            className={`cursor-pointer p-2 rounded-md group transition-all ${isCompiling ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2a2d2e]'}`}
            title="Run Code (Ctrl+Enter)"
         >
           <Play size={24} className={`${isCompiling ? 'text-green-800' : 'text-green-500'} group-hover:text-green-400`} fill="currentColor" />
        </div>
        <div className="cursor-pointer p-2 hover:bg-[#2a2d2e] rounded-md group">
           <Settings size={24} className="text-[#858585] group-hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;