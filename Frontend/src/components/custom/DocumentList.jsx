import React, { useState } from 'react'
import { Search, FileText, Eye, Download, Calendar, User, Users, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'

const DocumentList = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: 'Academic Calendar 2024',
      documentType: 'General',
      fileType: 'PDF',
      uploadedBy: 'admin@ghrua.edu.in',
      uploadDate: new Date('2024-01-15T10:30:00'),
      accessGroups: ['students', 'faculty', 'hod'],
      branches: ['it', 'cse', 'cy'],
      semesters: ['1st', '2nd', '3rd'],
      fileSize: '2.5 MB',
      downloads: 1,
      description: 'Complete academic calendar for the year 2024 including holidays, exam schedules, and important dates.'
    },
    {
      id: 2,
      title: 'Attendance Guidelines',
      documentType: 'Attendance',
      fileType: 'DOCX',
      uploadedBy: 'hod@ghrietn.raisoni.net',
      uploadDate: new Date('2024-01-14T15:45:00'),
      accessGroups: ['faculty', 'hod'],
      branches: [],
      semesters: [],
      fileSize: '1.2 MB',
      downloads: 8,
      description: 'Updated attendance guidelines for faculty members and department heads.'
    },
    {
      id: 3,
      title: 'IT Department Syllabus',
      documentType: 'Instructions',
      fileType: 'PDF',
      uploadedBy: 'admin@ghrua.edu.in',
      uploadDate: new Date('2024-01-13T09:20:00'),
      accessGroups: ['students', 'faculty'],
      branches: ['it'],
      semesters: ['1st', '2nd', '3rd', '4th'],
      fileSize: '5.8 MB',
      downloads: 4,
      description: 'Complete syllabus for IT department covering all semesters with course details and learning objectives.'
    },
    {
      id: 4,
      title: 'Staff Meeting Agenda',
      documentType: 'Others',
      fileType: 'DOCX',
      uploadedBy: 'admin@ghrua.edu.in',
      uploadDate: new Date('2024-01-12T14:15:00'),
      accessGroups: ['staff', 'hod'],
      branches: [],
      semesters: [],
      fileSize: '0.8 MB',
      downloads: 5,
      description: 'Minutes from the latest staff meeting discussing upcoming events and policy changes.'
    },
    {
      id: 5,
      title: 'CSE Lab Manual',
      documentType: 'Instructions',
      fileType: 'PDF',
      uploadedBy: 'faculty@ghrietn.raisoni.net',
      uploadDate: new Date('2024-01-11T11:30:00'),
      accessGroups: ['students', 'faculty'],
      branches: ['cse'],
      semesters: ['3rd', '4th', '5th'],
      fileSize: '8.2 MB',
      downloads: 9,
      description: 'Comprehensive lab manual for CSE students covering practical experiments and assignments.'
    },
    {
      id: 6,
      title: 'Examination Schedule',
      documentType: 'General',
      fileType: 'PDF',
      uploadedBy: 'admin@ghrua.edu.in',
      uploadDate: new Date('2024-01-10T16:45:00'),
      accessGroups: ['students', 'faculty', 'hod', 'staff'],
      branches: ['it', 'cse', 'cy', 'ds', 'etc', 'ai', 'me', 'ee'],
      semesters: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
      fileSize: '3.1 MB',
      downloads: 7,
      description: 'Complete examination schedule for all departments and semesters for the current academic year.'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || doc.documentType.toLowerCase() === filterType
    
    return matchesSearch && matchesType
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterType])

  const openModal = (document) => {
    setSelectedDocument(document)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedDocument(null)
  }

  const getAccessGroupsText = (groups) => {
    return groups.map(group => group.charAt(0).toUpperCase() + group.slice(1)).join(', ')
  }

  const getBranchesText = (branches) => {
    if (branches.length === 0) return 'All branches'
    return branches.map(branch => branch.toUpperCase()).join(', ')
  }

  const getSemestersText = (semesters) => {
    if (semesters.length === 0) return 'All semesters'
    return semesters.join(', ')
  }

  const getFileTypeIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return '📄'
      case 'docx':
        return '📝'
      case 'pptx':
        return '📊'
      case 'csv':
        return '📊'
      case 'txt':
        return '📄'
      case 'image':
        return '🖼️'
      default:
        return '📄'
    }
  }

  return (
    <div className="bg-neutral-700/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">Uploaded Documents</h3>
          <p className="text-neutral-400 text-sm">View and manage uploaded documents</p>
        </div>
        <div className="text-right">
          <p className="text-neutral-400 text-sm">Total Documents</p>
          <p className="text-2xl font-bold text-white">{documents.length}</p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-neutral-600/30 border-neutral-500 text-white placeholder:text-neutral-400"
          />
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-neutral-600/30 border border-neutral-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="general">General</option>
          <option value="instructions">Instructions</option>
          <option value="attendance">Attendance</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {currentDocuments.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-600/30 rounded-lg p-4 hover:bg-neutral-600/50 transition-all duration-200 cursor-pointer"
            onClick={() => openModal(doc)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl">{getFileTypeIcon(doc.fileType)}</div>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{doc.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-neutral-400">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {doc.documentType}
                    </span>
                    <span>{doc.fileSize}</span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {doc.downloads} downloads
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                  {doc.fileType}
                </span>
                <Eye className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-neutral-400">No documents found matching your criteria.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredDocuments.length > 0 && (
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
              </select>
              <span className="text-neutral-400 text-sm">entries</span>
            </div>
            
            <div className="text-neutral-400 text-sm">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredDocuments.length)} of {filteredDocuments.length} results
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

            <span className="text-neutral-400 text-sm">
              Page {currentPage} of {totalPages}
            </span>

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

      {/* Document Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-600">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getFileTypeIcon(selectedDocument.fileType)}</div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{selectedDocument.title}</h2>
                    <p className="text-neutral-400 text-sm">{selectedDocument.fileType} • {selectedDocument.fileSize}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="flex h-[60vh]">
                {/* Left Side - Document Preview */}
                <div className="w-1/2 p-6 border-r border-neutral-600">
                  <h3 className="text-lg font-semibold text-white mb-4">Document Preview</h3>
                  <div className="bg-neutral-700/50 rounded-lg h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{getFileTypeIcon(selectedDocument.fileType)}</div>
                      <p className="text-neutral-400 mb-2">{selectedDocument.title}</p>
                      <p className="text-neutral-500 text-sm">{selectedDocument.fileSize}</p>
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Side - Document Details */}
                <div className="w-1/2 p-6 overflow-y-auto">
                  <h3 className="text-lg font-semibold text-white mb-4">Document Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-neutral-400 text-sm font-medium mb-2">Description</h4>
                      <p className="text-white">{selectedDocument.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-neutral-400 text-sm font-medium mb-2">Document Type</h4>
                        <p className="text-white">{selectedDocument.documentType}</p>
                      </div>
                      <div>
                        <h4 className="text-neutral-400 text-sm font-medium mb-2">File Type</h4>
                        <p className="text-white">{selectedDocument.fileType}</p>
                      </div>
                      <div>
                        <h4 className="text-neutral-400 text-sm font-medium mb-2">File Size</h4>
                        <p className="text-white">{selectedDocument.fileSize}</p>
                      </div>
                      <div>
                        <h4 className="text-neutral-400 text-sm font-medium mb-2">Downloads</h4>
                        <p className="text-white">{selectedDocument.downloads}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-neutral-400 text-sm font-medium mb-2">Upload Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-neutral-400" />
                          <span className="text-white">Uploaded by: {selectedDocument.uploadedBy}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-neutral-400" />
                          <span className="text-white">
                            Uploaded on: {format(selectedDocument.uploadDate, 'MMM dd, yyyy HH:mm')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-neutral-400 text-sm font-medium mb-2">Access Information</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-neutral-400 text-sm">Access Groups: </span>
                          <span className="text-white">{getAccessGroupsText(selectedDocument.accessGroups)}</span>
                        </div>
                        {selectedDocument.branches.length > 0 && (
                          <div>
                            <span className="text-neutral-400 text-sm">Branches: </span>
                            <span className="text-white">{getBranchesText(selectedDocument.branches)}</span>
                          </div>
                        )}
                        {selectedDocument.semesters.length > 0 && (
                          <div>
                            <span className="text-neutral-400 text-sm">Semesters: </span>
                            <span className="text-white">{getSemestersText(selectedDocument.semesters)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DocumentList
