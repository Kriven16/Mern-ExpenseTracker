import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({fullName,width,height,className}) => {
  return (
    <div className={`${width || "w-12"} ${height || 'h-12' } ${className || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100  ` }>
      {getInitials(fullName || "")}
    </div>
  )
}

export default CharAvatar