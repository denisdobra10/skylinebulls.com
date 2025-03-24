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
    <div className="rounded-lg bg-[#1e1e1e] overflow-hidden shadow-2xl w-full">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] sticky top-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span className="ml-2 text-[#808080] text-sm font-mono truncate">{fileName}</span>
      </div>
      <div className="overflow-x-auto">
        <pre className="!m-0 !bg-[#1e1e1e] !rounded-none min-w-max">
          <code className={`language-${language} text-sm md:text-base`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock; 