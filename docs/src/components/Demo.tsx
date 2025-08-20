import CodeBlock from "./public/CodeBlock";
import Description from "./public/Description";
import Title from "./public/Title";
import "./styles/Installation.css"

export default function Demo() {
  
  return (
    <div className="main" id="LivePreview">
      <Title title="🎬 Live Preview" /> 
      <Description  description="A quick preview of the component in action:" />
      <a
        href="https://resizable-draggable-container-demo.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "0.75rem",
          padding: "0.6rem 1.2rem",
          backgroundColor: "#1f2d45",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "600",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          transition: "background 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0059c1")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0070f3")}
      >
        🚀 Live Demo
      </a>
       <img
            src="/demo_updated.gif"
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
