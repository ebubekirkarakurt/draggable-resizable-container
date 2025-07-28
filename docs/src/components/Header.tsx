import "./styles/Header.css"

export default function Header() {
  return (
    <div className="title" id='Quickstart' >
        📐Draggable Resizable Container
        <div className="external-links">
            <a
                href="https://github.com/ebubekirkarakurt/resizable-container"
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
            >
                <img src="https://img.icons8.com/?size=100&id=12599&format=png&color=FFFFFF" alt="NPM" className="icon" />
            </a>
            
            <a
                href="https://www.npmjs.com/package/draggable-resizable-container"
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
            >
                <img src="https://img.icons8.com/?size=512&id=24895&format=png" alt="NPM" className="icon" />
            </a>
            </div>

    </div>
    
  )
}
