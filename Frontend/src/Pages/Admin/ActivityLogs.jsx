import React, { useState } from 'react'
import AdminDashboardSidebar from '../../components/custom/AdminDashboardSidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Download, ChevronDown, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const ActivityLogs = () => {
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('1d')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [viewMode, setViewMode] = useState('details')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(50)
  const navigate = useNavigate()
  
  // Mock data for activity logs
  const activityLogs = [
    {
      id: 1,
      dateTime: new Date('2024-08-28T19:20:00'),
      user: 'harsh.yadav1@ghrietn.raisoni.net',
      kind: 'web search',
      cost: 1,
      status: 'success'
    },
    {
      id: 2,
      dateTime: new Date('2024-08-28T19:15:00'),
      user: 'admin@ghrua.edu.in',
      kind: 'assistant',
      cost: 1,
      status: 'success'
    },
    {
      id: 3,
      dateTime: new Date('2024-08-28T19:10:00'),
      user: 'faculty@ghrietn.raisoni.net',
      kind: 'web search',
      cost: 0,
      status: 'failed'
    },
    {
      id: 4,
      dateTime: new Date('2024-08-28T19:05:00'),
      user: 'student@ghrua.edu.in',
      kind: 'assistant',
      cost: 1,
      status: 'success'
    },
    {
      id: 5,
      dateTime: new Date('2024-08-28T19:00:00'),
      user: 'hod@ghrietn.raisoni.net',
      kind: 'web search',
      cost: 1,
      status: 'success'
    },
    {
      id: 6,
      dateTime: new Date('2024-08-28T18:55:00'),
      user: 'staff@ghrua.edu.in',
      kind: 'assistant',
      cost: 0,
      status: 'failed'
    },
    {
      id: 7,
      dateTime: new Date('2024-08-28T18:50:00'),
      user: 'harsh.yadav1@ghrietn.raisoni.net',
      kind: 'web search',
      cost: 1,
      status: 'success'
    },
    {
      id: 8,
      dateTime: new Date('2024-08-28T18:45:00'),
      user: 'admin@ghrua.edu.in',
      kind: 'assistant',
      cost: 1,
      status: 'success'
    },
    {
      id: 9,
      dateTime: new Date('2024-08-28T18:40:00'),
      user: 'faculty@ghrietn.raisoni.net',
      kind: 'web search',
      cost: 1,
      status: 'success'
    },
    {
      id: 10,
      dateTime: new Date('2024-08-28T18:35:00'),
      user: 'student@ghrua.edu.in',
      kind: 'assistant',
      cost: 0,
      status: 'failed'
    }
  ]

  // Generate more mock data for pagination testing
  const generateMockData = () => {
    const data = []
    const baseDate = new Date('2024-08-28T18:00:00')
    
    for (let i = 11; i <= 150; i++) {
      // Create a valid date by subtracting minutes from the base date
      const dateTime = new Date(baseDate.getTime() - (i * 5 * 60 * 1000)) // Subtract 5 minutes for each record
      
      data.push({
        id: i,
        dateTime: dateTime,
        user: ['harsh.yadav1@ghrietn.raisoni.net', 'admin@ghrua.edu.in', 'faculty@ghrietn.raisoni.net', 'student@ghrua.edu.in', 'hod@ghrietn.raisoni.net', 'staff@ghrua.edu.in'][i % 6],
        kind: i % 2 === 0 ? 'web search' : 'assistant',
        cost: i % 3 === 0 ? 0 : 1,
        status: i % 4 === 0 ? 'failed' : 'success'
      })
    }
    return data
  }

  const allLogs = [...activityLogs, ...generateMockData()]

  // Pagination logic
  const totalPages = Math.ceil(allLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLogs = allLogs.slice(startIndex, endIndex)

  const handleLogout = () => {
    navigate('/Login')
  }



  const getStatusBadgeColor = (status) => {
    return status === 'success' 
      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
      : 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  const exportToCSV = () => {
    const csvContent = [
      'Date & Time,User,Kind,Status,Cost',
      ...allLogs.map(log => 
        `${format(log.dateTime, 'MMM dd, yyyy hh:mm a')},${log.user},${log.kind},${log.status},${log.cost}`
      )
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `activity-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <section className="flex h-screen bg-neutral-800 text-white overflow-hidden">
      <AdminDashboardSidebar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-20' : 'ml-64'}`}>
        <header className="flex items-center justify-end p-4 bg-neutral-900">
          {/* Avatar and Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
              className="w-8 h-8 rounded-full bg-neutral-600 hover:bg-neutral-500 transition-colors duration-200 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={16} className="text-white" />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isAvatarDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 border border-neutral-600 rounded-lg shadow-xl z-50"
                >
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-neutral-700 transition-colors duration-200 text-left"
                    >
                      <LogOut size={16} className="text-red-400" />
                      <span className="text-red-400">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Navigation/Filtering Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Date Range Selector */}
                <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-neutral-700/50 border-neutral-500 text-white hover:bg-neutral-600/50"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(selectedDate, 'MMM dd')} – {format(selectedDate, 'MMM dd')}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-neutral-700 border-neutral-500">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="bg-neutral-700 text-white"
                    />
                  </PopoverContent>
                </Popover>

                {/* Time Period Filters */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedPeriod === '1d' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod('1d')}
                    className={selectedPeriod === '1d' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-neutral-700/50 border-neutral-500 text-white hover:bg-neutral-600/50'}
                  >
                    1d
                  </Button>
                  <Button
                    variant={selectedPeriod === '7d' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod('7d')}
                    className={selectedPeriod === '7d' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-neutral-700/50 border-neutral-500 text-white hover:bg-neutral-600/50'}
                  >
                    7d
                  </Button>
                  <Button
                    variant={selectedPeriod === '30d' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod('30d')}
                    className={selectedPeriod === '30d' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-neutral-700/50 border-neutral-500 text-white hover:bg-neutral-600/50'}
                  >
                    30d
                  </Button>
                </div>
              </div>

              {/* Export Button */}
              <Button
                onClick={exportToCSV}
                className="bg-neutral-700/50 border-neutral-500 text-white hover:bg-neutral-600/50"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>

            {/* Main Content Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">All Raw Events</h1>
              
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">View:</span>
                <div className="flex bg-neutral-700/50 rounded-md p-1">
                  <Button
                    variant={viewMode === 'details' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('details')}
                    className={viewMode === 'details' ? 'bg-blue-600 hover:bg-blue-700' : 'text-white hover:bg-neutral-600/50'}
                  >
                    Details
                  </Button>
                  <Button
                    variant={viewMode === 'tokens' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('tokens')}
                    className={viewMode === 'tokens' ? 'bg-blue-600 hover:bg-blue-700' : 'text-white hover:bg-neutral-600/50'}
                  >
                    Tokens
                  </Button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-neutral-700/50 rounded-lg overflow-hidden max-w-4xl mx-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-neutral-600">
                    <TableHead className="text-neutral-300 font-medium">DATE</TableHead>
                    <TableHead className="text-neutral-300 font-medium">USER</TableHead>
                    <TableHead className="text-neutral-300 font-medium">KIND</TableHead>
                    <TableHead className="text-neutral-300 font-medium">STATUS</TableHead>
                    <TableHead className="text-neutral-300 font-medium">COST</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentLogs.map((log) => (
                    <TableRow key={log.id} className="border-neutral-600 p-0">
                      <TableCell className="text-neutral-300">
                        {format(log.dateTime, 'MMM dd, hh:mm a')}
                      </TableCell>
                      <TableCell className="text-neutral-300">{log.user}</TableCell>
                      <TableCell className="text-neutral-300">
                        {log.kind}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(log.status)}`}>
                          {log.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-neutral-300">
                        {log.cost}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-neutral-400 text-sm">
                Showing {startIndex + 1} to {Math.min(endIndex, allLogs.length)} of {allLogs.length} results
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="bg-neutral-700/50 border-neutral-500 text-white hover:bg-neutral-600/50 disabled:opacity-50"
                >
                  Previous
                </Button>
                
                <span className="text-neutral-400 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-neutral-700/50 border-neutral-500 text-white hover:bg-neutral-600/50 disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ActivityLogs