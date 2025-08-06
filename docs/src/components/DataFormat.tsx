import CodeBlock from "./public/CodeBlock";
import Description from "./public/Description";
import Title from "./public/Title";
import "./styles/Installation.css"

type Props = {
  code: string;
  language?: string;
};

export default function DataFormat({ code, language = "bash" }: Props) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Code copied!");
    } catch (err) {
      alert("Copy failed!");
    }
  };

  return (
    <div className="main" id="DataFormat">
      <Title title="🔰 Sample Data Format" /> 
      <Description  description="Below is an example of the data prop passed to <DraggableResizableContainer />." />
      <CodeBlock  code={code} />
    </div>
  );
}
