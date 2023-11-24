import { Link } from "react-router-dom";
import MainDiv from "../../shared/MainDiv/MainDiv";
import './Banner.css'

const Banner = () => {
    return (
        <MainDiv>
             <div className='p-3'>
            <div className='relative   max-w-[1700px] m-auto '>
        <div className='banner-main'>
          <div className='z-[1]'>
          <h1 className='lg:text-5xl  md:text-3xl text-xl font-bold text-[#62445d]'>Welcome to our Medical Camp Hub – <br /> </h1>
          <p className='lg:text-4xl  md:text-2xl text-lg font-bold text-white md:mt-4 mt-2'>where streamlined organization meets impactful healthcare outreach</p>
           
          </div>
           <div className='z-[1]  md:mt-8 mt-6 lg:mt-14'>
           {/* <button  className='bg-[#11192BA8] text-white  p-4'><Link to='allBlog'>Go All BLogs</Link></button> */}
           </div>
    </div>
    </div>
        </div>
        </MainDiv>
    );
};

export default Banner;