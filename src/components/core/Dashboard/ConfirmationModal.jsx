import React from 'react'

const ConfirmationModal = ({ confirmationModal }) => {
 

  return (

    <div className='flex w-[full] min-h-[calc(100vh-3.5rem)]  justify-center items-center '>
      <div className=' w-[350px] h-[180px] bg-richblack-800 p-5 flex flex-col gap-[40px] rounded-md border-1px border-richblack-300'>
        <div className='flex flex-col gap-[20px]'>
          <h1 className='text-[24px] text-white leading-[24px] font-semibold '>{confirmationModal?.text1}</h1>
          <h2 className='text-[16px] text-richblack-300 leading-[14px] font-semibold '>{confirmationModal?.text2}</h2>
        </div>
        <div className='flex gap-[15px] text-richblack-800' >
          <button onClick={confirmationModal?.btnhandler1}
            className=' cursor-pointer rounded-md text-center text-[16px] text-richblack-800 font-semibold h-[30px] w-[80px] bg-yellow-25   '
          >
            {confirmationModal?.btn1Text}
          </button>
          <button onClick={confirmationModal?.btnhandler2} 
             className=' cursor-pointer rounded-md text-center text-[16px] text-richblack-800 font-semibold h-[30px] w-[80px] bg-richblack-300  '
          >
            {confirmationModal?.btn2Text}
          </button>
        </div>
      </div>
    </div>


  )
}

export default ConfirmationModal
