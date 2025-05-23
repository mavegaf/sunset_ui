import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="max-w-2xl mx-auto mt-10 space-y-4 p-4">
      <header>
        <h1 className="text-2xl font-bold">Sun time</h1>
      </header>
    </main>
  )
}

export default App
