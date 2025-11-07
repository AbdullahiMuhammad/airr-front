import React, { useState } from 'react'
import AgenciesList from './AgenciesList';


const Agency = () => {
  const [view, setView] = useState("list");
  console.log(view);
  return (
    <div className='flex-1'>
      <AgenciesList />
    </div>
  )
}

export default Agency;