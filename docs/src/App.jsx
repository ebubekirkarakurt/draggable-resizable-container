import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Installation from './components/Installation'
import SideMenu from './components/SideMenu'
import SimpleUsage from './components/SimpleUsage'
import Props from './components/Props'
import Demo from './components/Demo'
import DataFormat from './components/DataFormat'
import { data } from './components/data'

function App() {
  return (
    <div className="app-container">
      <SideMenu />
      <div className="content">
        <Header />
        <Demo/>
        <Installation code='> npm i draggable-resizable-container' />
        <DataFormat code={data} />
        <SimpleUsage/>
        <Props/>
      </div>
    </div>
  )
}

export default App
