import React from 'react'
import { useSelector } from 'react-redux'
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
const MyProfile = () => {


  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  if (!user) {
    return (
      <div className='text-white text-[48px]'>
        Loading...........
      </div>
    )
  }

  return (

    <div className='h-[calc(100vh-3.5rem)] w-[calc(100vw-222px)] overflow-x-hidden ' >

      <div className=' p-5 flex flex-col gap-[10px]  w-[1217px] bg-transparent h-[120px]' >

        <div className='flex  ' >
          <p className='w-full h-[22px] text-richblack-300  leading-[22px] text-[14px]  font-normal ' > Home / Dashboard /
            <span className=' text-yellow-50' > My Profile </span> </p>
        </div>

        <p className='w-full h-[38px] text-richblack-5  leading-[38px] text-[30px]  font-semibold ' > My Profile </p>

      </div>

      <div className='flex justify-center items-center w-full '>
        <div className='w-[792px] flex  flex-col gap-[20px]'>
          {/* email photo name edit */}
          <div className='flex bg-richblack-800  rounded-md border-richblack-700 border-[1px]  items-center p-[24px] gap-[20px]  '>
            <div className='w-[628px] items-center flex gap-[24px] h-[78px]'>

              <div className='h-[80px] flex  rounded-full justify-center items-center'>
                <img  className="aspect-square w-[78px] rounded-full object-cover" src={user.image} alt="profileimage" />
              </div>
        

              {/* name and email sec */}

              <div className='w-[526px] flex flex-col h-[50px] gsp-[2px]'>
                <p className=' text-richblack-5 text-[18px] font-semibold leading-[26px]  ' >{user.firstName} {user.lastName}</p>
                <p className=' text-richblack-300 text-[14px] font-normal leading-[22px]  ' >{user.email}</p>
              </div>

            </div>

            <button onClick={()=> {
                  navigate('/dashboard/settings')
            }} className=' flex w-[96px] h-[40px] rounded-md bg-yellow-50 justify-center font-semibold items-center  gap-[8px]' >
              <FiEdit width={18} height={18} />
              <p>Edit</p>
            </button>

          </div>

          {/* About Section */}
          <div className='flex flex-col bg-richblack-800 rounded-md border-richblack-700 border-[1px]  items-center p-[24px] gap-[20px]  '>
            <div className=' flex  justify-between items-center w-[744px] h-[40px] gap-[20px]' >
              <p className='text-richblack-5 text-center  leading-[26px] text-[18px]  font-semibold '>About</p>
              <button onClick={()=> {
                  navigate('/dashboard/settings')
            }} className=' flex w-[96px] h-[40px] rounded-md bg-yellow-50 justify-center font-semibold items-center  gap-[8px]' >
                <FiEdit width={18} height={18} />
                <p>Edit</p>
              </button>
            </div>

            <div className='w-full  text-richblack-300 text-justify  '>
              <p className={`${user?.additionalDetails?.about
                  ? "text-richblack-400"
                  : "text-richblack-5"
                } text-sm font-medium`} >
                {user?.additionalDetails?.about ?? "Write Something About Yourself"} </p>
            </div>
            
            <div className='w-full ' >
            <p  className=' text-richblack-5 text-[20px] mt-5 ' > Account Type : {user?.accountType}</p>
            </div>

          </div>

          {/* Personal Details */}
          <div className='flex flex-col mb-[100px] bg-richblack-800 rounded-md border-richblack-700 border-[1px]  items-center p-[24px] gap-[25px]  '>
            <div className=' flex  justify-between items-center w-[744px] h-[40px] gap-[20px]' >
              <p className='text-richblack-5 text-center  leading-[26px] text-[18px]  font-semibold '>Personal Details</p>
              <button onClick={()=> {
                  navigate('/dashboard/settings')
            }} className=' flex w-[96px] h-[40px] rounded-md bg-yellow-50 justify-center font-semibold items-center  gap-[8px]' >
                <FiEdit width={18} height={18} />
                <p>Edit</p>
              </button>
            </div>
              
              <div  className='flex w-full'>
                <div className='flex flex-col gap-2 w-[370px] '>
                  <p className=' text-richblack-500 text-[14px] font-normal'>First Name</p>
                  <p className=' text-richblack-25 text-[16px] font-semibold' >{user?.firstName}</p>
                </div>

                <div className='flex flex-col gap-2 w-[370px] '>
                  <p className=' text-richblack-500 text-[14px] font-normal'>Last Name</p>
                  <p className=' text-richblack-25 text-[16px] font-semibold' >{user?.lastName}</p>
                </div>

              </div>

              <div  className='flex w-full'>
                <div className='flex flex-col gap-2 w-[370px] '>
                  <p className=' text-richblack-500 text-[14px] font-normal'>Email</p>
                  <p className=' text-richblack-25 text-[16px] font-semibold' >{user?.email}</p>
                </div>

                <div className='flex flex-col gap-2 w-[370px] '>
                  <p className=' text-richblack-500 text-[14px] font-normal'>Phone Number</p>
                  <p className=' text-richblack-25 text-[16px] font-semibold' >{user?.additionalDetails?.contactNumber}</p>
                </div>

              </div>
              
              <div  className='flex w-full'>
                <div className='flex flex-col gap-2 w-[370px] '>
                  <p className=' text-richblack-500 text-[14px] font-normal'>Gender</p>
                  <p className=' text-richblack-25 text-[16px] font-semibold' >{user?.additionalDetails?.gender}</p>
                </div>

                <div className='flex flex-col gap-2 w-[370px] '>
                  <p className=' text-richblack-500 text-[14px] font-normal'>Date of Birth</p>
                  <p className=' text-richblack-25 text-[16px] font-semibold' >{user?.additionalDetails?.dateOfBirth}</p>
                </div>

              </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default MyProfile
