import { useQuery } from "@tanstack/react-query";
import useAxiosNormal from "../../../hooks/useAxiosNormal";
import ErrorPage from "../../../components/errorpage/ErrorPage";
import Skeleton from "react-loading-skeleton";
import pp from '../../../assets/logo/no-profile-picture-icon.jpg'




import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import MainDiv from "../../../shared/MainDiv/MainDiv";



const Testimonials = () => {
    const axiosNormal=useAxiosNormal()
    const reviewsFn=async()=>{
         const res=await axiosNormal.get('/reviews')
         return res.data
    }
           const{data:reviews,isLoading,isError,isPending}=useQuery({
             queryKey:['review'],
             queryFn: reviewsFn
           })
           if (isError) {
            return <ErrorPage></ErrorPage>
        }
    
        if (isLoading || isPending) {
            return <Skeleton count={10} />
        }

    return (
       <MainDiv>
         <section className="my-20">
         <div className="mx-auto text-center md:w-4/12 my-8">
            
            <h3 className="uppercase text-4xl border-y-4 py-4">People <span className="text-[#B354A6]">Reviews</span></h3>
       </div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

            {
                reviews.map(review => <SwiperSlide
                    key={review._id}
                >
                    <div className="flex flex-col items-center mx-24 my-16">
                        <h1 className="mb-5 text-2xl">{review.campName}</h1>
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={review.rating}
                            readOnly
                        />
                        <p className="py-8">{review.comment}</p>
                        <div className="avatar">
                        <div className="w-14 mb-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            {
                                review?.pic ?  <img src={review.pic} /> : <img src={pp} />
                            }

                        </div>
                    </div>
                        <h3 className="text-2xl text-[#B354A6]">{review.userName}</h3>
                    </div>
                </SwiperSlide>)
            }
        </Swiper>
    </section>
       </MainDiv>
    );
};

export default Testimonials;