import React from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import { useState } from 'react'
import HighlightText from './HighlightText'
import Cards from './Cards'
const tabsName = [
    "Free",
    "New To Coding",
    "Most Popular",
    "Skills Paths",
    "Career Paths",
]

export default function ExploreMore() {

  const [tabs, setTabs] = useState(tabsName[0])
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

  
  function onclickHndler(ele) {
    setTabs(ele);
    
    console.log("Clicked ele:", ele);
  
    const result = HomePageExplore.find((course) =>
      course.tag.toLowerCase() === ele.toLowerCase()
    );
  
    console.log("Found result:", result);
  
    if (result) {
      setCourses(result.courses);
      setCurrentCard(result.courses[0].heading);
    } else {
      // Handle the case when 'result' is not found
      // You might want to add appropriate error handling here.
    }
  }

  return (
    <div className='flex flex-col relative w-11/12 max-w-maxContent gap-[12px] mt-[120px] mb-28 '>
      <div className='text-center text-[36px]  '>
        Unlock the 
        <HighlightText text={"Power of Code"}/>
      </div>
      <div className='text-[16px] text-richblack-400 text-center font-bold ' >
        Learn to Build Anything You Can Imagine
      </div>

      {/* tab */}
      <div className=' flex justify-center w-[70%] mx-auto mt-10 rounded-lg bg-richblack-800 gap-10 h-[50px] items-center  p-4 '>
        {
          tabsName.map((ele, index)=> {
            return (
              <div className={` w-[17%] h-[40px] transition-all hover:text-white text-[14px] py-1 hover:bg-richblack-900  flex justify-center items-center rounded-full font-bold cursor-pointer ${tabs === ele ? 'text-white bg-richblack-900'  : 'text-richblack-200 ' }  `} 
               onClick={()=> onclickHndler(ele)} key={index}
              >
                {ele}
              </div>
            )
          })
        }
      </div>

      {/* Cards */ }
      
      <div className=' flex max-w-maxContent  relative w-[100%] '>
          {
            courses.map((course, index)=> {
              return (
                  <Cards course={course} key={index} currentCard={currentCard} setCurrentCard={setCurrentCard} />
              ) 
            })
          }
      </div>


    </div>
  ) 
}
