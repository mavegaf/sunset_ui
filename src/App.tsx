import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Search } from 'lucide-react'

import type { DateRange } from 'react-day-picker'
import { DatePickerWithRange } from '@/components/date-picker-with-range'

function App() {
  type LocationResult = {
    display_name: string
    lat: string
    lon: string
    place_id: number
  }

  const [location, setLocation] = useState('')
  const [results, setResults] = useState<LocationResult[]>([])
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>()

  async function handleSearch() {
    if (!location) return

    try {
      setLoading(true)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=5&featuretype=city`,
        {
          headers: {
            'User-Agent': 'sunset-ui/1.0 mavegaf@gmail.com',
          },
        }
      )

      const data = await response.json()
      setResults(data)
      console.log(data)
      console.log(date)
      console.log(date?.from)
    } catch (err) {
      console.error('Error al buscar ubicación:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Sun time</CardTitle>
          <CardDescription>Look for a location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <div>
              <Input
                type="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
            <Button type="submit" onClick={handleSearch} disabled={loading}>
              <Search />
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">You can search for a city like "Santiago"</p>
        </CardFooter>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardContent className="text-sm p-4 space-y-2">
            <p className="font-bold text-muted-foreground mb-2">More than one result found:</p>
            {results.map((result) => (
              <div
                key={result.place_id}
                className="flex justify-between items-center border rounded p-2"
              >
                <div>
                  <p className="font-medium">{result.display_name}</p>
                  <p className="text-xs text-muted-foreground">
                    Lat: {result.lat}, Lng: {result.lon}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log('Seleccionado:', result.lat, result.lon)
                  }}
                >
                  See data
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  )
}

export default App
