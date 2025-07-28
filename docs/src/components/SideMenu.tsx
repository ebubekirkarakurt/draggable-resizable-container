import React from "react";
import "./styles/SideMenu.css";

const menuItems = [
  { label: "Quick start", href: "/get-started#Quickstart" },
  { label: "Installation", href: "/get-started#Installation" },
  { label: "Simple Usage", href: "/get-started#SimpleUsage" },
  { label: "Props", href: "/get-started#Props" },
];

export default function SideMenu() {
  return (
    <aside className="side-menu">
      <div className="side-menu-title">
        <h4>----------- Menu -----------</h4>
      </div>
      <ul className="side-menu-list">
        {menuItems.map((item) => (
          <React.Fragment key={item.href}>
            <li className="menu-item">
              <code aria-hidden="true" className="icon">{'</>'}</code>
              <a href={item.href}>{item.label}</a>
            </li>

            {/* Extra sub-items under Simple Usage */}
            {item.label === "Simple Usage" && (
              <>
                <li className="menu-item sub-item">
                  <code className="icon">↳</code>
                  <a href="/get-started#SimpleUsageReact">React</a>
                </li>
                <li className="menu-item sub-item">
                  <code className="icon">↳</code>
                  <a href="/get-started#SimpleUsageVanilla">Vanilla JS</a>
                </li>
              </>
            )}
          </React.Fragment>
        ))}
      </ul>
    </aside>
  );
}
