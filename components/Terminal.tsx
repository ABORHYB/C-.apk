import React, { useRef, useEffect } from 'react';
import { X, ChevronUp, Trash2, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  output: string;
  isError: boolean;
  onClear: () => void;
  isVisible: boolean;
  onToggle: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ output, isError, onClear, isVisible, onToggle }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output, isVisible]);

  if (!isVisible) {
     return (
        <div 
          onClick={onToggle}
          className="h-6 bg-[#007acc] text-white flex items-center px-4 text-xs cursor-pointer hover:bg-[#0062a3] justify-between transition-colors"
        >
           <div className="flex items-center gap-2">
             <TerminalIcon size={12} />
             <span className="font-medium">Output</span>
           </div>
           <ChevronUp size={14} />
        </div>
     );
  }

  return (
    <div className="flex flex-col h-48 bg-[#1e1e1e] border-t border-[#414141]">
      {/* Terminal Tabs */}
      <div className="flex items-center justify-between px-2 h-8 bg-[#1e1e1e] border-b border-[#2b2b2b] text-[#cccccc] text-[11px] uppercase tracking-wide select-none">
        <div className="flex">
          <span className="px-3 h-8 flex items-center text-[#858585] cursor-pointer hover:text-[#cccccc]">Problems</span>
          <span className="px-3 h-8 flex items-center border-b border-[#e7e7e7] cursor-pointer font-medium text-white">Output</span>
          <span className="px-3 h-8 flex items-center text-[#858585] cursor-pointer hover:text-[#cccccc]">Debug Console</span>
          <span className="px-3 h-8 flex items-center text-[#858585] cursor-pointer hover:text-[#cccccc]">Terminal</span>
        </div>
        <div className="flex items-center gap-1 pr-2">
           <button onClick={onClear} className="p-1 hover:bg-[#333333] rounded text-[#cccccc]" title="Clear Output">
             <Trash2 size={14} />
           </button>
           <button onClick={onToggle} className="p-1 hover:bg-[#333333] rounded text-[#cccccc]" title="Close Panel">
             <X size={14} />
           </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-2 overflow-auto font-mono text-sm whitespace-pre-wrap leading-relaxed"
        style={{ fontFamily: "'Consolas', 'Courier New', monospace" }}
      >
        {!output && (
          <div className="text-[#858585] mt-1 text-xs">
            [Running] cd "c:\Users\Dev\Project\" && g++ main.cpp -o main && "c:\Users\Dev\Project\main"<br/>
            <span className="italic opacity-50">Waiting for compiler output...</span>
          </div>
        )}
        
        {output && (
          <div className="w-full">
            {/* Simulate the command line echo */}
            <div className="text-[#858585] mb-2 text-xs">
                [Running] g++ main.cpp -o main.exe && ./main.exe
            </div>
            
            {/* The Actual Output */}
            <span className={isError ? "text-[#f48771]" : "text-[#cccccc]"}>
              {output}
            </span>

            {/* Completion Message */}
            <div className="mt-4 text-[#858585] text-xs">
              [Done] exited with code {isError ? 1 : 0}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;