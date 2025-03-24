import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'html', fileName = 'example.html' }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="rounded-lg bg-[#1e1e1e] overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span className="ml-2 text-[#808080] text-sm font-mono">{fileName}</span>
      </div>
      <pre className="!m-0 !bg-[#1e1e1e] !rounded-none">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock; 