import CodeBlock from "./public/CodeBlock";
import Description from "./public/Description";
import Title from "./public/Title";
import "./styles/Installation.css"

type Props = {
  code: string;
  language?: string;
};

export default function Installation({ code, language = "bash" }: Props) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied!");
    } catch (err) {
      alert("Copy failed!");
    }
  };

  return (
    <div className="main">
      <Title title="Installation" /> 
      <Description  description="Installing Draggable Resizable Container only takes a single command and you're ready to roll." />
      <CodeBlock  code={code} />
    </div>
  );
}
