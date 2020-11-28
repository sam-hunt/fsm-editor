import React from 'react';
import Prism from 'prismjs';
import './prism-themes/prism-vsc-dark-plus.css';
// import './prism-themes/prism-dracula.css';
// import './prism-themes/dracula-prism.css';

const PrismCode: React.FC<{ code: string }> = ({ code }) => {
  setTimeout(() => Prism.highlightAll(), 0)
  return (
    <pre className="line-numbers">
      <code className="language-javascript">
        {code}
      </code>
    </pre>
  );
}
  
export default PrismCode;
