import React, { useRef } from 'react';
import { highlightCpp } from '../utils/syntaxHighlight';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
}

const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Tab support
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      
      const newValue = value.substring(0, start) + "    " + value.substring(end);
      onChange(newValue);
      
      // Need to set selection cursor after render
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  // Shared styles for perfect alignment
  const sharedStyle: React.CSSProperties = {
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: '14px',
    lineHeight: '1.5',
    letterSpacing: '0px',
    padding: '1rem',
    tabSize: 4,
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#1e1e1e]">
      {/* Syntax Highlighting Layer */}
      <pre
        ref={preRef}
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-full m-0 pointer-events-none whitespace-pre overflow-hidden"
        style={{ ...sharedStyle }}
        dangerouslySetInnerHTML={{ __html: highlightCpp(code) + '<br>' }} 
      />

      {/* Input Layer */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        className="absolute top-0 left-0 w-full h-full m-0 bg-transparent text-transparent caret-[#aeafad] outline-none resize-none whitespace-pre overflow-auto"
        style={{ 
            ...sharedStyle,
            color: 'transparent',
            caretColor: '#aeafad' // VS Code default caret color
        }}
      />
    </div>
  );
};

export default Editor;