import React from 'react'

import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { VscSignOut } from 'react-icons/vsc'

import ConfirmationModal from './ConfirmationModal'
import { logout } from '../../../services/operations/authApi'
import SideLinks from './SideLinks'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate  = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.profile)
    const [confirmationModal, setConfirmationModal] = useState(null);

    return (
        <div className='relative' >
            <div className='w-[222px] h-full flex flex-col gap-[10px]  bg-richblack-800' >
                <div className='w-[222px] h-[190px] flex flex-col gap-[10px] justify-center items-center ' >
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type) return null;
                            return (
                                <SideLinks key={link?.id} link={link} iconName={link.icon} />
                            )
                        })
                    }
                </div>
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
                <div className='flex flex-col w-[222px] gap-[10px]' >
                    <SideLinks
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />

                    <button onClick={() => {
                        setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your account.",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btnhandler1: () => { dispatch(logout(navigate)) },
                            btnhandler2: () => { setConfirmationModal(null) }
                        })
                    }} >
                        <div className=" ml-[20px] flex text-[14px] leading-[22px] font-medium  items-center gap-x-2 text-richblack-300 ">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>

            {
                confirmationModal && (
                    <div className=' z-[10000] absolute top-0 w-[100vw] min-h-[calc(100vh-3.5rem)]  backdrop-blur-sm  ' >
                         <ConfirmationModal confirmationModal={confirmationModal} />
                    </div>

                )
            }
           
        </div>
    )
}

export default Sidebar
