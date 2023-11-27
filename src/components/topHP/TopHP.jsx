import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import MainDiv from '../../shared/MainDiv/MainDiv';


const TopHP = () => {
    return (
        <MainDiv>
            <section>
          <div className="mx-auto text-center md:w-4/12 my-12 ">
            
            <h3 className="uppercase text-4xl border-y-4 py-4">Our Top <span className="text-[#B354A6]">Healthcare Professional </span></h3>
       </div>
            <div >
                <Swiper
           slidesPerView={4}
           spaceBetween={30}
           centeredSlides={true}
           pagination={{
             clickable: true,
           }}
           modules={[Pagination]}
           className="mySwiper md:mb-14"
           initialSlide={2}
         >
           <SwiperSlide className=''>
               <img src='https://i.ibb.co/K0zV7qH/dr5.jpg' alt="" />
               <h3 className='text-2xl uppercase text-center  text-[#B354A6]'>Doctor Nuha</h3>
           </SwiperSlide>
           <SwiperSlide> <img src="https://i.ibb.co/R9ZRv0w/dr3.jpg" alt="" />
           <h3 className='text-2xl uppercase text-center  text-[#B354A6]'>DR. Tanvir Hossan</h3>
           </SwiperSlide>
           <SwiperSlide> <img src="https://i.ibb.co/R380CBp/dr4.jpg" alt="" />
           <h3 className='text-2xl uppercase text-center  text-[#B354A6]'>Professor Rima</h3>
           </SwiperSlide>
           <SwiperSlide><img src="https://i.ibb.co/V2JBZCT/dr1.jpg" alt="" />
           <h3 className='text-2xl uppercase text-center  text-[#B354A6]'>Doctor Limon</h3>
           </SwiperSlide>
           <SwiperSlide><img src="https://i.ibb.co/1qm5P40/dr2.jpg" alt="" />
           <h3 className='text-2xl uppercase text-center  text-[#B354A6]'>Doctor Faiza</h3>
           </SwiperSlide>
         </Swiper>
           </div>
        </section>
        </MainDiv>
       );
};

export default TopHP;