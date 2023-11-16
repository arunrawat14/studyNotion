import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { matchPath, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { useState } from 'react'
import { useEffect } from 'react'
import { apiConnector } from '../../services/apiconnecter'
import { catogories } from '../../services/api'
import { BiDownArrow } from 'react-icons/bi'


export default function Navbar() {


    // here i am fetching the data from the central storage slice

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [sublinks, setSublinks] = useState([]);


    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", catogories.CATEGORIES_API,);
            console.log(catogories.CATEGORIES_API)
            console.log(result);
            setSublinks(result.data.Category);

        } catch (error) {
            console.log("error in getting all categories", error.message);
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    const location = useLocation();

    function matchLink(route) {
        return matchPath({ path: route }, location.pathname)
    }

    return (


        <div className='flex h-14 items-center justify-center bg-richblack-800 border-b-[1px] border-richblack-700  '>

            <div className='w-11/12 flex max-w-maxContent justify-between items-center '>
                <Link to='/'>
                    <img width={160} height={42} loading='lazy' src={logo} alt="logo" />
                </Link>


                {/* Nav Links */}

                <nav>
                    <ul className='flex gap-x-6 text-richblack-25 '>
                        {
                            NavbarLinks.map((link, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? (
                                                <div className='flex relative items-center gap-2 group'>
                                                    <p> {link.title} </p>
                                                    <BiDownArrow />
                                                    <div className='invisibe absolute -left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 
                                                translate-x-[-20%]  translate-y-7
                                                text-richblack-900 opacity-0 transition-all lg:w-[300px] duration-200 group-hover:visible group-hover:opacity-100 ' >
                                                        {
                                                            sublinks.map((link, index)=> {
                                                                return (
                                                                    <div key={index} className='' >
                                                            
                                                                        {link.name}
                                                                    </div> 

                                                                )
                                                            })
                                                        }

                                                        <div className='rounded rotate-45 top-0 translate-x-[148px] -translate-y-2 absolute  h-6 w-6  bg-richblack-5 '>
                                                        </div>
                                                        

                                                    </div>

                                                </div>) : (
                                                <Link to={link?.path} >
                                                    <p className={`${matchLink(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* login / signup / dashboard */}

                <div className='flex gap-x-4 justify-center items-center  '>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login" className=' flex justify-center items-center h-[16px]  '>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-5
                                    rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup" className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-5
                                rounded-md'>
                                <button>
                                    signup
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>

            </div>

        </div>

    )
}
