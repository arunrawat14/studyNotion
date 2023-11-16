import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timeLineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        logo: logo1,
        heading: "Leadership",
        description: "Fully Commited to the sucess company"
    },
    {
        logo: logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
    {
        logo: logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
    {
        logo: logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution"
    },
]
export default function TimeLineSection() {
    return (

        <div className='w-11/12 max-w-maxContent mt-28'>
            <div className='flex flex-row gap-24 w-[100%] items-center  max-w-maxContent justify-between'>
                <div className='w-[45%] flex flex-col gap-5 '>
                    {
                        timeline.map((element, index) => {
                            return (
                                <div className='flex flex-row gap-6 ' key={index}>
                                    <div className='w-[50px] h-[50px] bg-white flex justify-center items-center'>
                                        <img src={element.logo} alt='img' />
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                        <p className='text-base'>{element.description}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

                <div className='w-[55%] shadow-blue-200 shadow-lg relative flex justify-end '>
                <img src={timeLineImage} alt="ar" />

                    <div className='absolute -bottom-11 left-[95px] bg-caribbeangreen-700 flex items-center justify-center flex-row gap-[52px] uppercase w-[460px] h-[128px] '>
                        <div className='flex w-[161px] gap-[24px] h-[44px]  text-caribbeangreen-200'>
                            <p className='w-[42px] h-[44px] text-white text-[36px] font-bold '>10</p>
                            <p className='w-[95px] h-[44px] text-[14px]'>YEARS EXPERIENCES </p>
                        </div>

                        <div className='flex w-[162px] h-[44px] justify-between '> 
                            <p className='w-[70px] h-[44px] text-white font-bold text-[36px] '>250</p>
                            <p className='w-[68px] h-[44px] text-caribbeangreen-200 text-[14px]' >TYPES OF COURSES</p>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}
