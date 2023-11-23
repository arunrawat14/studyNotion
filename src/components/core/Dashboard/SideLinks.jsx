import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const SideLinks = ({link, iconName}) => {

    const location = useLocation()

    const Icon = Icons[iconName]

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname)
    }

  return (
    <NavLink
    to={link.path}
    className={` flex gap-[20px] text-center w-[222px] h-[38px]  ${matchRoute(link.path) ? " bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300"}`}
>
    <span
        className={` h-full w-[0.15rem]  bg-yellow-50 ${matchRoute(link.path) ? " opacity-100" : "opacity-0 "}`}
    ></span>

    <div className='flex  gap-[6px] text-[14px] leading-[22px] font-medium items-center' >
            <Icon/>
            <span>{link?.name}</span>
    </div>

</NavLink>
  )
}

export default SideLinks
