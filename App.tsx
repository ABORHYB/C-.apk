import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Explorer from './components/Explorer';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import { compileAndRunCpp } from './services/gemini';
import { X, Plus, Play } from 'lucide-react';

const DEFAULT_CODE = `#include <iostream>
#include <vector>
#include <string>

using namespace std;

// A simple C++ class example
class Greeter {
public:
    Greeter(string name) : name(name) {}
    
    void sayHello() {
        cout << "Hello, " << name << "!" << endl;
        cout << "Welcome to ACod Compiler." << endl;
    }

private:
    string name;
};

int main() {
    // Basic loop calculation
    int sum = 0;
    for (int i = 1; i <= 5; ++i) {
        sum += i;
    }
    
    Greeter g("Developer");
    g.sayHello();
    
    cout << "Sum of 1 to 5 is: " << sum << endl;

    return 0;
}`;

const App: React.FC = () => {
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [output, setOutput] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState<boolean>(true);

  const handleRun = async () => {
    if (isCompiling) return;
    
    setIsCompiling(true);
    setIsTerminalVisible(true);
    setOutput("Compiling and executing...");
    setIsError(false);

    const result = await compileAndRunCpp(code);
    
    setOutput(result.output);
    setIsError(result.isError);
    setIsCompiling(false);
  };

  const handleClearTerminal = () => {
    setOutput("");
    setIsError(false);
  };

  // Keyboard shortcut for Run (Ctrl/Cmd + Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleRun();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, isCompiling]);

  return (
    <div className="flex h-screen w-screen bg-[#1e1e1e] text-[#cccccc] overflow-hidden">
      {/* Activity Bar */}
      <Sidebar onRun={handleRun} isCompiling={isCompiling} />
      
      {/* Sidebar Explorer */}
      <Explorer />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Tab Bar */}
        <div className="h-9 bg-[#252526] flex items-center overflow-x-auto no-scrollbar">
          <div className="h-full px-3 flex items-center bg-[#1e1e1e] border-t-2 border-[#007acc] text-white min-w-[120px] justify-between cursor-pointer pr-2">
            <span className="text-sm flex items-center">
              <span className="text-blue-400 mr-1 text-xs">C++</span>
              main.cpp
            </span>
            <X size={14} className="hover:bg-[#424242] rounded-md p-0.5 ml-2" />
          </div>
           <div className="h-full px-3 flex items-center bg-[#2d2d2d] text-[#858585] min-w-[120px] justify-between cursor-pointer hover:bg-[#2a2d2e] border-r border-[#1e1e1e]">
             <span className="text-sm">utils.h</span>
             <X size={14} className="hover:bg-[#424242] rounded-md p-0.5 ml-2" />
           </div>
           <div className="px-2 cursor-pointer hover:bg-[#2a2d2e] h-full flex items-center">
              <Plus size={16} className="text-[#858585]" />
           </div>
        </div>

        {/* Breadcrumb / Toolbar */}
        <div className="h-6 bg-[#1e1e1e] border-b border-[#2d2d2d] flex items-center px-4 text-xs text-[#858585]">
          <span>src</span>
          <span className="mx-1">&gt;</span>
          <span>main.cpp</span>
          <span className="ml-2 flex-grow"></span>
          <button 
             onClick={handleRun}
             disabled={isCompiling}
             className="flex items-center gap-1 text-green-500 hover:text-green-400 disabled:opacity-50 transition-colors"
          >
             <Play size={12} fill="currentColor" />
             <span>Run Code</span>
          </button>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative">
           <div className="absolute inset-0 flex">
              {/* Line Numbers */}
              <div className="w-12 bg-[#1e1e1e] text-[#858585] text-right pr-3 pt-4 text-base font-mono select-none border-r border-[#1e1e1e]">
                {code.split('\n').map((_, i) => (
                   <div key={i} className="leading-[1.5]">{i + 1}</div>
                ))}
              </div>
              
              {/* Actual Editor */}
              <div className="flex-1 relative">
                 <Editor code={code} onChange={setCode} />
              </div>
           </div>
        </div>

        {/* Terminal/Output */}
        <Terminal 
           output={output} 
           isError={isError} 
           onClear={handleClearTerminal} 
           isVisible={isTerminalVisible}
           onToggle={() => setIsTerminalVisible(!isTerminalVisible)}
        />
        
        {/* Status Bar */}
        <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs select-none">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                 <div className="w-3 h-3 rounded-full border border-white flex items-center justify-center text-[8px] font-bold">X</div>
                 0
              </span>
              <span className="flex items-center gap-1">
                 <div className="w-3 h-3 rounded-full border border-white flex items-center justify-center text-[8px] font-bold">!</div>
                 0
              </span>
           </div>
           <div className="flex items-center gap-4">
              <span>Ln {code.substring(0, code.length).split('\n').length}, Col 1</span>
              <span>UTF-8</span>
              <span>C++</span>
              <span>Prettier</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;