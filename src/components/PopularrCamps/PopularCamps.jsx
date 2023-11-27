import { useQuery } from "@tanstack/react-query";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import MainDiv from "../../shared/MainDiv/MainDiv";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Card from "../../pages/availableCamps/Card";

const PopularCamps = () => {
      
    const axiosNormal=useAxiosNormal()
     
    const topCamps=async()=>{
        const res=await axiosNormal.get('/topCamps')
        return res
    }
    const {data:topCampInfo ,isLoading,isPending}=useQuery({
         queryKey:['topCamps'],
         queryFn: topCamps
    })

       if(isLoading || isPending){
         return   <Skeleton count={10} />
       }

    return (
       <MainDiv>
         <div className="mx-auto text-center md:w-4/12 my-8">
            
            <h3 className="uppercase text-4xl border-y-4 py-4">Popular Medical  <span className="text-[#B354A6]">Camps</span></h3>
       </div>

       <div className='pt-12 md:p-0 p-3 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-8'>
             {
                topCampInfo?.data?.map(info=><Card key={info._id} info={info}></Card>)
             }
            
        </div>

       </MainDiv>
    );
};

export default PopularCamps;