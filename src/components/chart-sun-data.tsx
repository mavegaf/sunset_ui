'use client'

import { useMemo } from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, ResponsiveContainer } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function timeToDecimal(timeStr: string): number {
  const [time, modifier] = timeStr.split(' ')
  const [hoursStr, minutesStr] = time.split(':')
  let hours = parseInt(hoursStr, 10)
  const minutes = parseInt(minutesStr, 10)

  if (modifier === 'PM' && hours !== 12) hours += 12
  if (modifier === 'AM' && hours === 12) hours = 0

  return +(hours + minutes / 60).toFixed(2)
}

function decimalToTime(value: number): string {
  const hours = Math.floor(value)
  const minutes = Math.round((value - hours) * 60)
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

type Props = {
  sunData: {
    date: string
    sunrise: string
    sunset: string
    golden_hour: string
  }[]
  location: string
}

/**
 * shadcn Charts
 * @see https://ui.shadcn.com/charts
 *
 * @param param0
 * @returns
 */
export function ChartSunData({ sunData, location }: Props) {
  const chartData = useMemo(() => {
    return sunData.map((entry) => ({
      date: entry.date.slice(5), // "MM-DD"
      sunrise: timeToDecimal(entry.sunrise),
      sunset: timeToDecimal(entry.sunset),
      golden: timeToDecimal(entry.golden_hour),
    }))
  }, [sunData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sun Times - {location}</CardTitle>
        <CardDescription>Sunrise, Sunset & Golden Hour</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
            <Tooltip
              formatter={(value: number) => decimalToTime(value)}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line dataKey="sunset" name="Sunset" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line
              dataKey="golden"
              name="Golden Hour"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line dataKey="sunrise" name="Sunrise" stroke="#facc15" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
