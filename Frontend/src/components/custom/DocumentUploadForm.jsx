import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Upload, FileText, ChevronDown, X, Check, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { motion, AnimatePresence } from 'framer-motion'

// Custom Multi-Select Component using Command
const MultiSelect = ({ 
  options, 
  selectedValues = [], 
  onSelectionChange, 
  placeholder = "Select options...",
  className = "",
  maxDisplay = 2
}) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (value) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onSelectionChange(newSelection)
  }

  const removeItem = (value) => {
    const newSelection = selectedValues.filter(v => v !== value)
    onSelectionChange(newSelection)
  }

  const selectedLabels = options
    .filter(option => selectedValues.includes(option.value))
    .map(option => option.label)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between bg-neutral-600/30 border-neutral-500 text-white hover:bg-neutral-600/50 ${className}`}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {selectedValues.length > 0 ? (
              <>
                {selectedLabels.slice(0, maxDisplay).map((label, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md"
                  >
                    {label}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeItem(options.find(opt => opt.label === label)?.value)
                      }}
                      className="hover:text-red-300"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {selectedValues.length > maxDisplay && (
                  <span className="text-neutral-400 text-xs">
                    +{selectedValues.length - maxDisplay} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-neutral-400">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-neutral-700 border-neutral-500">
        <Command className="bg-neutral-700">
          <CommandInput 
            placeholder="Search options..." 
            className="text-white bg-neutral-700 border-neutral-500 focus:border-blue-500"
          />
          <CommandList className="bg-neutral-700">
            <CommandEmpty className="text-neutral-400">No option found.</CommandEmpty>
            <CommandGroup className="bg-neutral-700">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="text-white hover:bg-neutral-600 focus:bg-neutral-600 focus:text-white data-[selected=true]:bg-neutral-600 data-[selected=true]:text-white"
                >
                  <Check
                    className={`mr-2 h-4 w-4 text-blue-400 ${
                      selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const DocumentUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedInfoAccess, setSelectedInfoAccess] = useState([])
  const [selectedBranches, setSelectedBranches] = useState([])
  const [selectedSemesters, setSelectedSemesters] = useState([])
  
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm()
  
  const isStudentSelected = selectedInfoAccess.includes('students')

  const documentTypes = [
    { value: 'general', label: 'General' },
    { value: 'instructions', label: 'Instructions' },
    { value: 'attendance', label: 'Attendance' },
    { value: 'others', label: 'Others' }
  ]

  const infoAccessOptions = [
    { value: 'students', label: 'Students' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'hod', label: 'HOD' },
    { value: 'staff', label: 'Staff' }
  ]

  const fileTypes = [
    { value: 'pdf', label: 'PDF' },
    { value: 'docx', label: 'DOCX' },
    { value: 'pptx', label: 'PPTX' },
    { value: 'csv', label: 'CSV' },
    { value: 'txt', label: 'TXT' },
    { value: 'image', label: 'Image' }
  ]

  const branches = [
    { value: 'it', label: 'IT' },
    { value: 'cse', label: 'CSE' },
    { value: 'cy', label: 'CY' },
    { value: 'ds', label: 'DS' },
    { value: 'etc', label: 'ETC' },
    { value: 'ai', label: 'AI' },
    { value: 'me', label: 'ME' },
    { value: 'ee', label: 'EE' }
  ]

  const semesters = [
    { value: '1st', label: '1st Semester' },
    { value: '2nd', label: '2nd Semester' },
    { value: '3rd', label: '3rd Semester' },
    { value: '4th', label: '4th Semester' },
    { value: '5th', label: '5th Semester' },
    { value: '6th', label: '6th Semester' },
    { value: '7th', label: '7th Semester' },
    { value: '8th', label: '8th Semester' }
  ]

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const onSubmit = async (data) => {
    setIsUploading(true)
    console.log('Form data:', data)
    console.log('Selected file:', selectedFile)
    console.log('Info Access:', selectedInfoAccess)
    console.log('Branches:', selectedBranches)
    console.log('Semesters:', selectedSemesters)
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsUploading(false)
    setSelectedFile(null)
    setSelectedInfoAccess([])
    setSelectedBranches([])
    setSelectedSemesters([])
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-700/50 rounded-lg p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Upload className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Upload Document</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - All Input Fields */}
        <div className="space-y-6">
          {/* Document Type and File Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="documentType" className="text-white mb-2 block">
                Document Type
              </Label>
              <Controller
                name="documentType"
                control={control}
                rules={{ required: 'Document type is required' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-neutral-600/30 border-neutral-500 text-white hover:bg-neutral-600/50">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-700 border-neutral-500">
                      {documentTypes.map((type) => (
                        <SelectItem 
                          key={type.value} 
                          value={type.value} 
                          className="text-white hover:bg-neutral-600 focus:bg-neutral-600 focus:text-white"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.documentType && (
                <span className="text-red-400 text-sm mt-1">{errors.documentType.message}</span>
              )}
            </div>

            <div>
              <Label htmlFor="fileType" className="text-white mb-2 block">
                File Type
              </Label>
              <Controller
                name="fileType"
                control={control}
                rules={{ required: 'File type is required' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full bg-neutral-600/30 border-neutral-500 text-white hover:bg-neutral-600/50">
                      <SelectValue placeholder="Select file type" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-700 border-neutral-500">
                      {fileTypes.map((type) => (
                        <SelectItem 
                          key={type.value} 
                          value={type.value} 
                          className="text-white hover:bg-neutral-600 focus:bg-neutral-600 focus:text-white"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.fileType && (
                <span className="text-red-400 text-sm mt-1">{errors.fileType.message}</span>
              )}
            </div>
          </div>

          {/* Info Access */}
          <div>
            <Label className="text-white mb-2 block">
              Info Access To
            </Label>
            <MultiSelect
              options={infoAccessOptions}
              selectedValues={selectedInfoAccess}
              onSelectionChange={setSelectedInfoAccess}
              placeholder="Select access groups..."
              className="w-full bg-neutral-600/30 border-neutral-500 text-white hover:bg-neutral-600/50"
            />
            {selectedInfoAccess.length === 0 && (
              <span className="text-red-400 text-sm mt-1">Please select at least one access group</span>
            )}
          </div>

          {/* Document Description */}
          <div>
            <Label htmlFor="description" className="text-white mb-2 block">
              Document Description
            </Label>
            <textarea
              {...register('description', { 
                required: 'Document description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters long'
                },
                maxLength: {
                  value: 500,
                  message: 'Description must not exceed 500 characters'
                }
              })}
              placeholder="Enter a brief description of the document..."
              className="w-full px-3 py-2 bg-neutral-600/30 border border-neutral-500 rounded-md text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
            {errors.description && (
              <span className="text-red-400 text-sm mt-1">{errors.description.message}</span>
            )}
            <div className="text-neutral-400 text-xs mt-1">
              {watch('description')?.length || 0}/500 characters
            </div>
          </div>

          {/* Conditional Student Fields */}
          {isStudentSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 p-4 bg-neutral-600/20 rounded-lg border border-neutral-500"
            >
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                Student-Specific Settings
              </h3>
              
              {/* Branch and Semester Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white mb-2 block">
                    Info Access for Branch
                  </Label>
                  <MultiSelect
                    options={branches}
                    selectedValues={selectedBranches}
                    onSelectionChange={setSelectedBranches}
                    placeholder="Select branches..."
                    className="w-full"
                  />
                </div>

                <div>
                  <Label className="text-white mb-2 block">
                    For Semester
                  </Label>
                  <MultiSelect
                    options={semesters}
                    selectedValues={selectedSemesters}
                    onSelectionChange={setSelectedSemesters}
                    placeholder="Select semesters..."
                    className="w-full"
                    maxDisplay={1}
                    color="blue"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isUploading || !selectedFile || selectedInfoAccess.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Uploading...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Document
              </div>
            )}
          </Button>
        </div>

        {/* Right Side - File Upload */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="file" className="text-white mb-2 block">
              Select File
            </Label>
            <div className="border-2 border-dashed border-neutral-500 rounded-lg p-8 text-center hover:border-blue-500 transition-colors h-full min-h-[300px] flex flex-col items-center justify-center">
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.docx,.pptx,.csv,.txt,.jpg,.jpeg,.png"
              />
              <label htmlFor="file" className="cursor-pointer flex flex-col items-center justify-center h-full">
                <FileText className="h-16 w-16 text-neutral-400 mb-4" />
                <p className="text-neutral-300 mb-2 text-lg">
                  {selectedFile ? selectedFile.name : 'Click to select a file or drag and drop'}
                </p>
                <p className="text-neutral-500 text-sm">
                  Supports: PDF, DOCX, PPTX, CSV, TXT, Images
                </p>
                {!selectedFile && (
                  <p className="text-neutral-400 text-xs mt-4">
                    Drag and drop your file here, or click to browse
                  </p>
                )}
              </label>
            </div>
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded text-green-400 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>File selected: {selectedFile.name}</span>
                </div>
                <p className="text-green-300 text-xs mt-1">
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default DocumentUploadForm