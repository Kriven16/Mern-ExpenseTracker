import React from 'react'
import { LuMoon, LuTrash, LuTrendingDown, LuTrendingUp, LuUtensils, LuUtensilsCrossed } from 'react-icons/lu'

const TransactionInfoCard = ({title,icon,date,amount,hideDeleteBtn,type,onDelete}) => {
 const getAmountStyles = ()=>{
  return type ==="income" ? "bg-green-50 text-green-500" :"bg-red-50 text-red-500"
 }
  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
      <div className='w-12 h-12 flex justify-center items-center text-xl text-gray-800 bg-gray-100 rounded-full '>
        {icon? (
          <img className='w-6 h-6' src={icon} alt="" />
        ):(
          <LuMoon/>
        )}
      </div>
      <div className='flex-1 flex items-center gap-2'>
        <div>
          <p className='text-sm text-gray-700 font-medium'>{title}</p>
          <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>

      </div>
      <div   className={ `flex items-center gap-2 px-3 pt-1.5 rounded-md ${getAmountStyles()}`}>
        {!hideDeleteBtn && (
          <button onClick={onDelete} className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'>
            <LuTrash size={18}/>
          </button>
        )}
        <div>
          <h6 className='text-xs font-medium'>${amount}</h6>
          {type==='income' ? <LuTrendingUp/> : <LuTrendingDown/> }
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard