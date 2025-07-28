import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Installation from './components/Installation'
import SideMenu from './components/SideMenu'
import SimpleUsage from './components/SimpleUsage'

function App() {
  return (
    <div className="app-container">
      <SideMenu />
      <div className="content">
        <Header />
        <Installation code='> npm i draggable-resizable-container' />
        <SimpleUsage/>
      </div>
    </div>
  )
}

export default App
