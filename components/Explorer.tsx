import React from 'react';
import { FolderOpen, FileCode, ChevronDown } from 'lucide-react';

const Explorer: React.FC = () => {
  return (
    <div className="w-60 bg-[#252526] text-[#cccccc] flex flex-col text-sm border-r border-[#1e1e1e]">
      <div className="p-2 text-xs font-bold uppercase tracking-wider flex justify-between items-center text-[#bbbbbb]">
        <span>Explorer</span>
      </div>
      
      <div className="flex flex-col">
         <div className="px-1 py-1 flex items-center cursor-pointer hover:bg-[#2a2d2e] font-bold">
            <ChevronDown size={16} className="mr-1" />
            <span className="uppercase text-xs">Project</span>
         </div>
         
         <div className="flex flex-col ml-2">
             <div className="flex items-center px-4 py-1 bg-[#37373d] cursor-pointer border-l-2 border-[#007acc]">
                <FileCode size={16} className="text-blue-400 mr-2" />
                <span>main.cpp</span>
             </div>
             <div className="flex items-center px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer text-[#858585]">
                <FileCode size={16} className="text-yellow-400 mr-2" />
                <span>utils.h</span>
             </div>
             <div className="flex items-center px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer text-[#858585]">
                <FileCode size={16} className="text-gray-400 mr-2" />
                <span>Makefile</span>
             </div>
         </div>
      </div>
    </div>
  );
};

export default Explorer;