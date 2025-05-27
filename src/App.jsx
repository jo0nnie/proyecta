import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import ReactImg from './components/ReactImg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        <ReactImg colordefondoimagen={"red"}/>
        </a>
      </div>

      <h1 className='bg-red-500'>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          El contador está en {count}
        </button>
        <p>
          Edita <code>src/App.jsx</code> y guarda para testear HMR
        </p>
      </div>
      <p className="read-the-docs">
        Haz click en los logos de Vite y React para aprender más
      </p>
      <ReactImg/>
    </>
  )
}

export default App