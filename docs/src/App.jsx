import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Installation from './components/Installation'

function App() {

  return (
    <>
      <Header/>
      <Installation code='npm i draggable-resizable-container' />
    </>
  )
}

export default App
