import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAbutton from '../components/core/HomePage/CTAbutton'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import teacher from '../assets/Images/Instructor.png'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'

export default function Home() {
    return (
        <div>
            {/* Section 1 */}
            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between '>

                <Link to={"/signUp"}>
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 
                hover: scale-75 w-fit shadow-lg shadow-richblack-500 '>
                        <div className=' flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 '>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>

                    </div>
                </Link>

                <div className='text-center text-3xl font-semibold mt-6'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className='w-[90%] mt-4 text-center text-lg font-bold text-richblack-500 ' >
                    With our online coding courses, you can learn at your own pace, from anywhere in the world,
                    and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex gap-7 mt-8 '>
                    <CTAbutton active={true} linkto="/signup">
                        Learn More
                    </CTAbutton>

                    <CTAbutton active={false} linkto="/login" >
                        Book a demo
                    </CTAbutton>
                </div>

                <div className='mx-40 my-10 shadow-2xl boxshadow  shadow-blue-200 '>

                    <video muted loop autoPlay className=''  >
                        <source src={Banner} type='video/mp4' />
                    </video>

                </div>

                {/* code section one */}
                <div>
                    <CodeBlocks position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighlightText text={"Coading Potential"} />
                                {" "}  with our online courses

                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                        ctabtn1={
                            {
                                btnText: "Try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n <html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                        codeColour={"text-yellow-25"}
                    >
                    </CodeBlocks>
                </div>

                {/* code section Two */}
                <div className='w-full'>
                    <CodeBlocks position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighlightText text={"coding in seconds"} />

                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btnText: "Try it yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "learn more",
                                linkto: "/login",
                                active: false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n <html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                        codeColour={"text-white"}
                    >
                    </CodeBlocks>
                </div>

                <ExploreMore />


            </div>

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700 mt-[100px] '>
                <div className='homepage_bg h-[500px]  flex items-center  ' >
                    <div className='w-11/12 max-w-maxContent flex item-center justify-center gap-5 mx-auto'>
                        <div className='flex gap-7 text-white '>
                            <CTAbutton active={true} linkto={"/signup"}  >
                                <div className='flex item-center gap-3'>
                                    Explore full catlog
                                    <FaArrowRight />
                                </div>
                            </CTAbutton>
                            <CTAbutton active={false} linkto={"/signup"} >
                                <div>
                                    Learn more
                                </div>
                            </CTAbutton>
                        </div>
                    </div>
                </div>

                <div className='mx-auto w-11/12 max-w-maxComtent flex flex-col items-center justify-between gap-7 mt-20 '>
                    <div className='flex gap-20 mb-10 p-2 justify-between max-w-maxContent  '>
                        <div className='item-center text-4xl  '>
                            Get the skills you need for a
                            <HighlightText text={"job that is in demand."} />
                        </div>

                        <div className='flex flex-col gap-7 text-richblack-600 '>
                            <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <div className='w-[20%]'>
                                <CTAbutton active={true} linkto={"/signup"} >
                                    Learn More
                                </CTAbutton>
                            </div>
                        </div>
                    </div>

                    <TimeLineSection />
                    <LearningLanguageSection />
                </div>
            </div>
            {/* Section 3 */}

            <div className='flex relative justify-between mx-auto w-11/12 max-w-maxContent p-5 mt-20 mb-72 '>

                <div className=' w-[600px] h-[545px] gap-[98px] bg-richblack-5   ' > </div>

                <div className='w-[616px] h-[545px] absolute left-10 -z-14 top-10 '>
                    <img className=' object-contain ' src={teacher} alt="teacher" />
                </div>

                <div className='w-[486px] gap-[12px] flex flex-col justify-center items-center'>

                    <div className='text-white  w-full justify-start flex h-[86px]  text-[36px] '>

                        <div className='w-[70%]'>
                            Become an
                            <HighlightText text={"instructor"} />

                        </div>
                    </div>

                    <div className='text-[16px] mt-6 font-bold text-richblack-400'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>

                    <div className='w-full justify-start flex mt-10 '>

                        <CTAbutton active={true} linkto={'/login'} >
                            <div className='flex gap-2'>
                                Start Learning Today
                                <FaArrowRight />
                            </div>
                        </CTAbutton>
                    </div>
                </div>
            </div>

            {/* Reviws from Other Learner */}
            
            <div className='flex-col relative justify-between mx-auto w-11/12 max-w-maxContent p-5 mt-16 mb-72 '>
            <h1 className="text-center text-4xl  text-richblack-5 font-semibold mt-8">
                Reviews from other learners
            </h1>
                <div className=' w-full  flex justify-center items-center    ' > 
                        <ReviewSlider />
            </div>
            </div>

            {/* Footer */}
            <Footer />

        </div>
    )
}
