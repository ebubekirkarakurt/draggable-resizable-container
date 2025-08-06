import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './styles/CodeBlock.css';

interface Props {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'tsx' }: Props) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      alert("Copy failed!");
    }
  };

  return (
    <div className="code-block">
      <SyntaxHighlighter
          language={language}
          style={oneDark}
          wrapLongLines={true}
          customStyle={{
            background: "#282c34",
            borderRadius: "0.5rem",
            padding: window.innerWidth < 700 ? "0.5rem" : "1.25rem",
            width: "94%",
            overflowX: "auto",
          }}
        >
          {code}
        </SyntaxHighlighter>
    </div>
  );
}
