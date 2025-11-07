import React from 'react'
import { BiSearch } from 'react-icons/bi';

const Searching = ({pHolder, onChange, cName, value }) => {
  return (
    <div className={`w-auto h-auto flex items-center justify-start px-2 gap-2 rounded ${cName}`}>
      <BiSearch className=' text-2xl' />
      <input type="searching" placeholder={pHolder} className={`flex-1 h-10 outline-none text-black`} value={value}  onChange={onChange} />
    </div>
    
  )
}

export default Searching;