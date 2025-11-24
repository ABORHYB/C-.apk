/**
 * A C++ syntax highlighter using VS Code Dark+ theme colors.
 */
export const highlightCpp = (code: string): string => {
  if (!code) return '';

  // Escape HTML characters first
  let safeCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // VS Code Dark+ Color Palette
  const colors = {
    comment: '#6A9955',      // Greenish grey
    string: '#CE9178',       // Salmon/Orange
    keywordControl: '#C586C0', // Pink/Magenta (if, else, return)
    keywordType: '#569CD6',    // Blue (int, void, bool)
    number: '#B5CEA8',       // Light Green
    function: '#DCDCAA',     // Light Yellow
    macro: '#C586C0',        // Purple/Pink
    stdType: '#4EC9B0',      // Teal (vector, string)
    operator: '#D4D4D4'      // White/Grey
  };

  // 1. Strings (protect them first)
  const strings: string[] = [];
  safeCode = safeCode.replace(/(".*?")/g, (match) => {
    strings.push(match);
    return `__STR_${strings.length - 1}__`;
  });

  // 2. Comments (protect them second)
  const comments: string[] = [];
  safeCode = safeCode.replace(/(\/\/.*)/g, (match) => {
    comments.push(match);
    return `__COM_${comments.length - 1}__`;
  });

  // 3. Preprocessor directives (#include, #define)
  safeCode = safeCode.replace(/(#\w+)/g, `<span style="color: ${colors.macro}">$1</span>`);
  
  // 4. Includes (<iostream>) - colored like strings usually, or specific color
  safeCode = safeCode.replace(/(&lt;.*?&gt;)/g, `<span style="color: ${colors.string}">$1</span>`);

  // 5. Keywords: Control Flow (Pink/Magenta)
  const controlKeywords = [
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 
    'break', 'continue', 'return', 'try', 'catch', 'throw', 'new', 
    'delete', 'using', 'namespace', 'template', 'typename', 'class', 'struct', 'public', 'private', 'protected'
  ];
  const controlRegex = new RegExp(`\\b(${controlKeywords.join('|')})\\b`, 'g');
  safeCode = safeCode.replace(controlRegex, `<span style="color: ${colors.keywordControl}">$1</span>`);

  // 6. Keywords: Types (Blue)
  const typeKeywords = [
    'int', 'void', 'char', 'float', 'double', 'bool', 'long', 'short', 
    'unsigned', 'signed', 'const', 'static', 'enum', 'union', 'virtual', 'friend', 'auto', 'this', 'true', 'false'
  ];
  const typeRegex = new RegExp(`\\b(${typeKeywords.join('|')})\\b`, 'g');
  safeCode = safeCode.replace(typeRegex, `<span style="color: ${colors.keywordType}">$1</span>`);

  // 7. Standard Library Types (Teal)
  safeCode = safeCode.replace(/\b(std|vector|string|map|set|list|queue|stack|iostream)\b/g, `<span style="color: ${colors.stdType}">$1</span>`);

  // 8. Functions (Yellow) - rough heuristic: word followed by (
  safeCode = safeCode.replace(/\b([a-zA-Z_]\w*)(?=\()/g, `<span style="color: ${colors.function}">$1</span>`);

  // 9. Numbers (Light Green)
  safeCode = safeCode.replace(/\b(\d+)\b/g, `<span style="color: ${colors.number}">$1</span>`);

  // Restore Comments
  safeCode = safeCode.replace(/__COM_(\d+)__/g, (_, i) => `<span style="color: ${colors.comment}">${comments[parseInt(i)]}</span>`);

  // Restore Strings
  safeCode = safeCode.replace(/__STR_(\d+)__/g, (_, i) => `<span style="color: ${colors.string}">${strings[parseInt(i)]}</span>`);

  return safeCode;
};