import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAbutton from '../HomePage/CTAbutton';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const LearningGrid = () => {
  return (
    <div className='grid w-11/12 max-w-maxContent  mt-[100px] mx-auto lg:grid-cols-4 mb-10 grid-cols-1 text-white ' >
      {
        LearningGridArray.map((card,index)=> {
            return (
                <div key={index} 
                className={`${index === 0 && "lg:col-span-2" } ${card.order % 2 ===1 ? " bg-richblack-700": "bg-richblack-800"}
                ${card.order ===3 && "lg:col-start-2"  } h-[292px] max-w-maxContent `} >
                    {
                        card.order < 0 ? (
                            <div className='bg-richblack-900 h-[100%] flex flex-col gap-[16px]  ' >
                                <div className='text-white w-[559px] h-[88px] text-[36px] leading-[44px] 
                                   font-semibold
                                ' >{card?.heading}
                                    <HighlightText text={card?.highlightText} />
                                </div>

                                <p className='w-[559px] h-[72px] text-[16px] leading-[24px] text-richblack-300 '>
                                    {card?.description}
                                </p>

                                <div className='w-[120px] h-[84px] '>
                                <CTAbutton linkto={card.BtnLink} active={true} >
                                   {card?.BtnText}
                                </CTAbutton>
                                </div>

                            </div>
                        ): (
                            <div className='flex flex-col w-[294px] h-[294px] gap-[32px] p-[32px]  '>
                                <div className='w-[230px] h-[52px] text-[16px] leading-[26px] text-richblack-5'> {card?.heading} </div>
                                <p  className='w-[230px] h-[88px] text-[14px] leading-[22px] text-richblack-200' > {card?.description} </p>
                            </div>
                        )
                    }

                </div>
            )
        })
      }
    </div>
  )
}

export default LearningGrid
