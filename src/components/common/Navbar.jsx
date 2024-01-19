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
import { BsChevronDown } from "react-icons/bs"


export default function Navbar() {


    // here i am fetching the data from the central storage slice

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [sublinks, setSublinks] = useState([]);
    const [loading, setLoading] = useState(false)


    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", catogories.CATEGORIES_API,);
            console.log(catogories.CATEGORIES_API)
            console.log( "all catogories are", result);
            setSublinks(result?.data?.Category);

        } catch (error) {
            console.log("error in getting all categories", error.message);
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchSublinks();
        setLoading(false)
    }, [])

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
      }

    return (


        <div className='flex h-14 items-center justify-center bg-richblack-800 border-b-[1px] border-richblack-700  '>

            <div className='w-11/12 flex max-w-maxContent justify-between items-center '>
                <Link to='/'>
                    <img width={160} height={42} loading='lazy' src={logo} alt="logo" />
                </Link>


                {/* Nav Links */}

                <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : sublinks.length ? (
                          <>
                            {sublinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

                {/* login / signup / dashboard */}

                <div className='flex gap-x-4 justify-center items-center  '>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className='w-[24px] h-[24px] rounded-full text-richblack-300' />
                                {
                                    totalItems > 0 && (
                                      <div className=' text-center  rounded-full  text-[12px] font-extrabold w-[15px] h-[15px] bg-richblack-5 absolute  -top-1 left-3 '>
                                       
                                            {totalItems}
                                
                                      </div>

                                        
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
