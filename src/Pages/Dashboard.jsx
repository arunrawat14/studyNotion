import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'
const Dashboard = () => {

    const {loading} = useSelector((state)=> state.profile)

    if(loading) {
        return (
            <div className='text-white text-[36px] mt-[100px] '>
                    Loading........................
                </div>
        )
    }

  return (
    <div className='flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar/>

        <div className='min-h-[calc(100vh-3.5rem)] overflow-auto '>
            <div>
                <Outlet/>
            </div>
        </div>

    </div>
  )
}

export default Dashboard
