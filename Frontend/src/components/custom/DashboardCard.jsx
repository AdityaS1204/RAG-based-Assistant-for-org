import React from 'react'

const DashboardCard = ({title,children,className}) => {
  return (
    <div className={`bg-neutral-700/50 rounded-lg p-4 w-1/3 h-26 py-3 cursor-pointer hover:bg-neutral-700/70 transition-all duration-300 ${className}`}>
        <p className='text-sm font-bold text-neutral-400'>{title}</p> 
        {children}
    </div> 
  )
}

export default DashboardCard