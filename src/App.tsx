import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <header>
        <h1 className="text-2xl font-bold">Sun time</h1>
      </header>
    </main>
  )
}

export default App
