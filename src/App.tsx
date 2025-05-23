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
import { ChartSunData } from '@/components/chart-sun-data'

function App() {
  type LocationResult = {
    display_name: string
    lat: string
    lon: string
    place_id: number
  }

  type SunData = {
    date: string
    sunrise: string
    sunset: string
    golden_hour: string
  }

  const [location, setLocation] = useState('')
  const [results, setResults] = useState<LocationResult[]>([])
  const [sunData, setSunData] = useState<SunData[]>([])
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>()

  async function handleSearch() {
    if (!location) return

    try {
      setLoading(true)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=10&featuretype=city`,
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

      if (data.length == 1) {
        // If there is only one result, we don't need to show coincidences
        fetchSunData(data[0].lat, data[0].lon);
      }
    } catch (err) {
      console.error('Error al buscar ubicación:', err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchSunData(lat: string, lng: string) {
    if (!date?.from || !date?.to) {
      alert('Need to select a date range')
      return
    }

    const query = new URLSearchParams({
      lat,
      lng,
      date_start: date.from.toISOString().split('T')[0],
      date_end: date.to.toISOString().split('T')[0],
    })

    try {
      const response = await fetch(`http://127.0.0.1:3000/suntimes?${query.toString()}`)
      const data = await response.json()
      setSunData(data)
      console.log('Datos recibidos:', data)
    } catch (err) {
      console.error('Error al buscar datos solares:', err)
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

      {results.length > 1 && (
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
                  onClick={() => fetchSunData(result.lat, result.lon)}
                >
                  See data
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {sunData.length > 0 && (
        <Card>
          <CardContent className="p-4 text-sm">
            <p className="font-bold mb-2">Results</p>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-1">Date</th>
                  <th className="py-1">Sunrise</th>
                  <th className="py-1">Sunset</th>
                  <th className="py-1">Golden Hour</th>
                </tr>
              </thead>
              <tbody>
                {sunData.map((item) => (
                  <tr key={item.date} className="border-b">
                    <td className="py-1">{item.date}</td>
                    <td className="py-1">{item.sunrise}</td>
                    <td className="py-1">{item.sunset}</td>
                    <td className="py-1">{item.golden_hour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
      {sunData.length > 0 && <ChartSunData sunData={sunData} />}
    </main>
  )
}

export default App
