import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="max-w-2xl mx-auto mt-10 space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Sun time</CardTitle>
          <CardDescription>Look for a location</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </main>
  )
}

export default App
