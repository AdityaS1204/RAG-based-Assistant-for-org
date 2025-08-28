import React, { useState } from 'react'
import { Trash2, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

const UsersTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: '2223MGFITIWE101',
      name: 'Aarav Sharma',
      role: 'Student',
      email: 'aarav.sharma.it@ghrietn.raisoni.net',
      lastLogin: new Date('2024-01-15T10:30:00')
    },
    {
      id: 2,
      username: null,
      name: 'Dr. Sonali Rithodkar',
      role: 'HOD',
      email: 'hodcseng@ghrietn.raisoni.net',
      lastLogin: new Date('2024-01-14T15:45:00')
    },
    {
      id: 3,
      username: null,
      name: 'Prof. Ashish Kakane',
      role: 'Faculty',
      email: 'ashish.kakane@ghrua.edu.in',
      lastLogin: new Date('2024-01-13T09:20:00')
    },
    {
      id: 4,
      username: '2223MGFCSEWE102',
      name: 'Isha Patil',
      role: 'Student',
      email: 'isha.patil.cse@ghrietn.raisoni.net',
      lastLogin: new Date('2024-01-15T14:15:00')
    },
    {
      id: 5,
      username: null,
      name: 'Sunil Kulkarni',
      role: 'Staff',
      email: 'sunil.kulkarni@ghrietn.raisoni.net',
      lastLogin: new Date('2024-01-12T11:30:00')
    },
    {
      id: 6,
      username: '2223MGFDSWE103',
      name: 'Riya Gupta',
      role: 'Student',
      email: 'riya.gupta.ds@ghrietn.raisoni.net',
      lastLogin: new Date('2024-01-15T16:45:00')
    },
    {
      id: 7,
      username: null,
      name: 'Dr. Suresh Pawar',
      role: 'Faculty',
      email: 'suresh.pawar@ghrua.edu.in',
      lastLogin: new Date('2024-01-14T13:20:00')
    },
    {
      id: 8,
      username: null,
      name: 'Meena Joshi',
      role: 'Staff',
      email: 'meena.joshi@ghrietn.raisoni.net',
      lastLogin: new Date('2024-01-11T08:15:00')
    },
    {
      id: 9,
      username: '2223MGFCYWE104',
      name: 'Vikram Singh',
      role: 'Student',
      email: 'vikram.singh.cy@ghrietn.raisoni.net',
      lastLogin: new Date('2024-01-15T12:30:00')
    },
    {
      id: 10,
      username: null,
      name: 'Dr. Kavita Rathi',
      role: 'HOD',
      email: 'hodcseng@ghrietn.raisoni.net',
      lastLogin: new Date('2024-01-13T16:20:00')
    },
    {
      id: 11,
      username: '2223MGFETCWE105',
      name: 'Neha Verma',
      role: 'Student',
      email: 'neha.verma.etc@ghrietn.raisoni.net',
      lastLogin: new Date('2024-01-15T09:45:00')
    },
    {
      id: 12,
      username: null,
      name: 'Prof. Manish Tiwari',
      role: 'Faculty',
      email: 'manish.tiwari@ghrua.edu.in',
      lastLogin: new Date('2024-01-14T11:15:00')
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesRole = filterRole === 'all' || user.role === filterRole
    
    return matchesSearch && matchesRole
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterRole])

  
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className="bg-neutral-700/50 rounded-lg p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">Users Management</h3>
          <p className="text-neutral-400 text-sm">Manage system users and their roles</p>
        </div>
        <div className="text-right">
          <p className="text-neutral-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-white">{users.length}</p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-neutral-600/30 border-neutral-500 text-white placeholder:text-neutral-400"
          />
        </div>
        
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-3 py-2 bg-neutral-600/30 border border-neutral-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="Student">Student</option>
          <option value="HOD">HOD</option>
          <option value="Faculty">Faculty</option>
          <option value="Staff">Staff</option>
        </select>
      </div>

      {/* Table */}
      <div className="border border-neutral-600 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-600 hover:bg-neutral-600/30">
              <TableHead className="text-neutral-300 font-semibold">ID</TableHead>
              <TableHead className="text-neutral-300 font-semibold">Username</TableHead>
              <TableHead className="text-neutral-300 font-semibold">Name</TableHead>
              <TableHead className="text-neutral-300 font-semibold">Role</TableHead>
              <TableHead className="text-neutral-300 font-semibold">Email</TableHead>
              <TableHead className="text-neutral-300 font-semibold">Last Login</TableHead>
              <TableHead className="text-neutral-300 font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id} className="border-neutral-600 hover:bg-neutral-600/30">
                <TableCell className="text-white font-medium">#{user.id}</TableCell>
                <TableCell className="text-neutral-300">
                  {user.username || (
                    <span className="text-neutral-500 italic">N/A</span>
                  )}
                </TableCell>
                <TableCell className="text-white font-medium">{user.name}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium}`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-neutral-300">{user.email}</TableCell>
                <TableCell className="text-neutral-300">
                  {format(user.lastLogin, 'MMM dd, yyyy HH:mm')}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteUser(user.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-neutral-400">No users found matching your criteria.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-neutral-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 text-sm">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="px-2 py-1 bg-neutral-600/30 border border-neutral-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-neutral-400 text-sm">entries</span>
            </div>
            
            <div className="text-neutral-400 text-sm">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} results
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="text-neutral-400 hover:text-white disabled:opacity-50"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-neutral-400 hover:text-white disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-2 text-neutral-400">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 p-0 ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-600/50'
                      }`}
                    >
                      {page}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-neutral-400 hover:text-white disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="text-neutral-400 hover:text-white disabled:opacity-50"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-neutral-600">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-neutral-400 text-sm">Total Users</p>
            <p className="text-lg font-semibold text-white">{users.length}</p>
          </div>
          <div>
            <p className="text-neutral-400 text-sm">Students</p>
            <p className="text-lg font-semibold ">
              {users.filter(u => u.role === 'Student').length}
            </p>
          </div>
          <div>
            <p className="text-neutral-400 text-sm">Staff</p>
            <p className="text-lg font-semibold ">
              {users.filter(u => u.role !== 'Student').length}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-neutral-400 text-sm">Filter</p>
          <p className="text-lg font-semibold text-white">
            {filterRole === 'all' ? 'All Roles' : filterRole}
          </p>
        </div>
      </div>
    </div>
  )
}

export default UsersTable
