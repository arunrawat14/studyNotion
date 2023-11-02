import React from 'react'
import {BsPeopleFill} from 'react-icons/bs'
import {BiSolidVector} from 'react-icons/bi'

export default function Cards({ course, currentCard , setCurrentCard}) {

    function onclickHandler(heading) {
        setCurrentCard(heading)
    }

    return (

        <div className='relative  max-w-maxContent w-full ' >

            <div className='absolute max-w-maxContent gap-[36px] mx-auto justify-between '>

                <div onClick={()=>onclickHandler(course.heading)} className={`flex  flex-col w-[341px] h-[300px] gap-[12px] hover:bg-richblack-5 hover:text-black transition-all  duration-200 mt-20 mx-auto justify-between ${currentCard === course.heading ? "bg-white box" : "bg-richblack-800"}`}>

                    <div className='flex flex-col gap-4 px-4'>
                        {/* Heading */}
                        <div className={`text-[20px] flex justify-start mt-4 font-bold ${currentCard === course.heading ? "text-black" : ""}`}>
                            {course.heading}
                        </div>

                        <div className='text-richblack-400 text-[16px] leading-5 text-justify'>
                            {course.description}
                        </div>
                    </div>

                    <div className=' p-5 flex justify-center item-center gap-16 text-[16px] border-t-2 border-dashed border-richblack-400 '>

                        <div className={`flex justify-center gap-2  items-center ${currentCard === course.heading ? "text-blue-500": " text-richblack-500"} `}>
                            <BsPeopleFill/>
                                {course.level}
                        </div>

                        <div className={`flex justify-center   items-center gap-2 ${currentCard === course.heading ? "text-blue-500": " text-richblack-500" } `}>
                            <BiSolidVector/>
                            {course.lessionNumber} Lesson
                        </div>
                       
                    </div>

                </div>

            </div>


        </div>




    )
}
