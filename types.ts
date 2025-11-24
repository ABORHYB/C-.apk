export interface ExecutionResult {
  output: string;
  isError: boolean;
}

export enum ThemeColors {
  Background = '#1e1e1e',
  Sidebar = '#252526',
  ActivityBar = '#333333',
  Panel = '#1e1e1e',
  StatusBar = '#007acc',
  TextPrimary = '#cccccc',
  TextSecondary = '#858585',
  Accent = '#0e639c'
}

export interface FileTab {
  id: string;
  name: string;
  language: string;
  content: string;
}