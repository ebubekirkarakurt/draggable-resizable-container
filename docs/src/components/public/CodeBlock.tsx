import React from "react";
import "./styles/CodeBlock.css";

interface Props {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "tsx" }: Props) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Kod kopyalandı!");
    } catch (err) {
      alert("Kopyalama başarısız!");
    }
  };

  return (
    <div className="code-block">
      <button className="copy-button text" onClick={handleCopy}>Copy</button>
      <pre>
        <code className={`language-${language} text`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

