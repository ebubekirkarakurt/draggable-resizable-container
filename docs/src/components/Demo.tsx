import CodeBlock from "./public/CodeBlock";
import Description from "./public/Description";
import Title from "./public/Title";
import "./styles/Installation.css"

export default function Demo() {
  
  return (
    <div className="main" id="LivePreview">
      <Title title="🎬 Live Preview" /> 
      <Description  description="A quick preview of the component in action:" />
       <img
            src="/demo.gif"
            alt="Draggable Resizable Container Demo"
            style={{
              maxWidth: '100%',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              marginTop: '1rem'
            }}
          />
    </div>
  );
}
