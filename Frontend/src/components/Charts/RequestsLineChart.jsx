import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Calendar, CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { format } from 'date-fns'

const RequestsLineChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [data, setData] = useState([])

  
  const generateData = (period, date) => {
    const data = []
    const now = new Date(date)
    
    switch (period) {
      case '1d':
        for (let i = 23; i >= 0; i--) {
          const time = new Date(now)
          time.setHours(now.getHours() - i)
          data.push({
            time: format(time, 'HH:mm'),
            requests: Math.floor(Math.random() * 50) + 10,
            date: format(time, 'MMM dd')
          })
        }
        break
      
      case '7d':
        for (let i = 6; i >= 0; i--) {
          const time = new Date(now)
          time.setDate(now.getDate() - i)
          data.push({
            time: format(time, 'MMM dd'),
            requests: Math.floor(Math.random() * 200) + 50,
            date: format(time, 'MMM dd, yyyy')
          })
        }
        break
      
      case '30d':
        for (let i = 29; i >= 0; i--) {
          const time = new Date(now)
          time.setDate(now.getDate() - i)
          data.push({
            time: format(time, 'MMM dd'),
            requests: Math.floor(Math.random() * 500) + 100,
            date: format(time, 'MMM dd, yyyy')
          })
        }
        break
      
      default:
        break
    }
    
    return data
  }

  useEffect(() => {
    setData(generateData(selectedPeriod, selectedDate))
  }, [selectedPeriod, selectedDate])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-800 border border-neutral-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`${label}`}</p>
          <p className="text-blue-400">{`Requests: ${payload[0].value}`}</p>
          <p className="text-neutral-400 text-sm">{payload[0].payload.date}</p>
        </div>
      )
    }
    return null
  }

  const periods = [
    { value: '1d', label: '1 Day' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ]

  return (
    <div className="bg-neutral-700/50 rounded-lg p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">Assistant Requests</h3>
          <p className="text-neutral-400 text-sm">Track request patterns and usage trends</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Timeline Buttons */}
          <div className="flex bg-neutral-600/30 rounded-lg p-1">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  selectedPeriod === period.value
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-600/50'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-neutral-600/30 border-neutral-500 text-white hover:bg-neutral-600/50"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(selectedDate, 'MMM dd, yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-neutral-800 border-neutral-600">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="bg-neutral-800 text-white"
                classNames={{
                  day: "text-white hover:bg-neutral-700",
                  day_selected: "bg-blue-500 text-white",
                  day_today: "bg-neutral-600 text-white",
                  caption: "text-white",
                  nav_button: "text-white hover:bg-neutral-700",
                  dropdown: "bg-neutral-700 text-white"
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#9CA3AF' }}
              formatter={(value) => <span style={{ color: '#9CA3AF' }}>{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              name="Requests"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-neutral-600">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-neutral-400 text-sm">Total Requests</p>
            <p className="text-2xl font-bold text-white">
              {data.reduce((sum, item) => sum + item.requests, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-neutral-400 text-sm">Average/Day</p>
            <p className="text-2xl font-bold text-blue-400">
              {Math.round(data.reduce((sum, item) => sum + item.requests, 0) / data.length).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-neutral-400 text-sm">Peak Requests</p>
            <p className="text-2xl font-bold text-green-400">
              {Math.max(...data.map(item => item.requests)).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-neutral-400 text-sm">Period</p>
          <p className="text-lg font-semibold text-white">
            {periods.find(p => p.value === selectedPeriod)?.label}
          </p>
        </div>
      </div>
    </div>
  )
}

export default RequestsLineChart
