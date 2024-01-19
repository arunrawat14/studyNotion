import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import aboutImg1 from '../assets/Images/aboutus1.webp'
import aboutImg2 from '../assets/Images/aboutus2.webp'
import aboutImg3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import aboutimage from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
    return (
        <div className=''>
            {/* section 1 */}
            <section className=' bg-richblack-800 mx-auto h-[618px] ' >
                <div className=' relative w-11/12 mx-auto justify-center items-center flex flex-col  ' >
                    <div className='flex flex-col justify-center items-center w-[913px] h-[176px] gap-[20px] mt-[140px] '>
                        <h1 className=' text-white w-[809px] h-[88px] text-[36px] 
                        leading-[44px] text-center align-middle font-semibold ' >
                            Driving Innovation in Online Education for a
                            <HighlightText text={"Brighter Future"} />
                        </h1>
                        <p className=" text-richblack-300 w-[809px] h-[72px] text-center text-[16px] leading-[24px] 
                             
                        ">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>

                    <div className='flex gap-4 h-[311px] absolute translate-y-[360px]'>
                        <img src={aboutImg1} alt="aboutimg1" />
                        <img src={aboutImg2} alt="aboutimg2" />
                        <img src={aboutImg3} alt="aboutimg3" />
                    </div>
                </div>
            </section>

            {/* section 2 */}
            <section className='mt-[180px]' >
                <div className=' flex justify-center w-11/12 mx-auto'>
                    <Quote />
                </div>
            </section>

            {/* section 3 */}
            <section className='w-11/12 max-w-maxContent mx-auto mt-[100px]'>

                <div className='flex text-white text-justify justify-between  items-center p-5 h-[552px] gap-[98px] '>
                    <div className='lg:w-[486px] flex flex-col h-[372px] gap-[24px]' >
                        <h1 className='text-[36px] leading-[44px] w-[486px] h-[44px]' >Our Founding Story</h1>
                        <p className='w-[486px] h-[120px] text-[16px] leading-[24px] text-richblack-300 font-semibold'>Our e-learning platform was born out of a shared vision and passion for transforming education.
                            It all began with a group of educators, technologists, and lifelong learners who recognized the
                            need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className='w-[486px] h-[120px] text-[16px] leading-[24px] text-richblack-300 font-semibold'>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional
                            education systems. We believed that education should not be confined to the walls of a classroom or
                            restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower
                            individuals from all walks of life to unlock their full potential.
                        </p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <img src={aboutimage} className=' bg-cover' alt="" />
                    </div>
                </div>

                <div className='flex text-white justify-between  items-center p-5 h-[416px] gap-[98px] text-justify '>
                    <div className='lg:w-[486px] flex flex-col h-[212px] gap-[24px]' >
                        <h1 className='text-[36px] leading-[44px] w-[486px] h-[44px] font-semibold ' >Our Vision</h1>
                        <p className='w-[486px] h-[120px] text-[16px] leading-[24px] text-richblack-300 font-semibold' >With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className='lg:w-[486px] flex flex-col h-[212px] gap-[24px]'>
                        <h1 className='text-[36px] leading-[44px] w-[486px] h-[44px] text-blue-100 font-semibold ' >Our Mission</h1>
                        <p className='w-[486px] h-[120px] text-[16px] leading-[24px] text-richblack-300 font-semibold' >our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>

            </section>

            {/* section 4  */}
            
                <Stats />
            

            {/* section 5  */}
            <LearningGrid />

            {/* section 6 */}
            <ContactFormSection />

           {/* Reviws from Other Learner */}
            
           <div className='flex-col relative justify-between mx-auto w-11/12 max-w-maxContent p-5 mt-16 mb-72 '>
            <h1 className="text-center text-4xl  text-richblack-5 font-semibold mt-8">
                Reviews from other learners
            </h1>
                <div className=' w-full  flex justify-center items-center    ' > 
                        <ReviewSlider />
            </div>
            </div>

            {/* Review section */}
            <div className='mt-[100px]'>
            <Footer />
            </div>


        </div>
    )
}

export default About
