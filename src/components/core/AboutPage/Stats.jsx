import React from 'react'


const stats = [
  {count: "5k", label:"Active Students"},
  {count: "10+", label:"Mentors"},
  {count: "200+", label:"Courses"},
  {count: "50+", label:"Awards"},

]

const Stats = () => {
  return (
    <section className=' bg-richblack-800 flex justify-center h-[254px] items-center ' >
      <div className='flex w-11/12  h-[254px] justify-center  items-center text-white gap-[60px]' >
        {
          stats.map((stat, index)=> {
            return (
              <div key={index} className='flex flex-col justify-center  items-center h-[72px] gap-[16px] w-[292px]  '>
                <p className='w-[41px] h-[38px] text-[30px] leading-[38px]  text-center font-semibold' >{stat?.count}</p>
                <p className='w-[124px] h-[24px] text-[16px] leading-[24px]  text-richblack-300  text-center font-semibold' >{stat?.label}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Stats
