import Skeleton from "react-loading-skeleton";
import useAllCamps from "../../hooks/useAllCamps";
import MainDiv from "../../shared/MainDiv/MainDiv";
import Card from "./Card";
import 'react-loading-skeleton/dist/skeleton.css'

const AvailableCamps = () => {
    const {campsInfo ,isLoading,isPending}=useAllCamps()
    if(isLoading || isPending){
     return   <Skeleton count={10} />
    }
    return (
        <MainDiv>
            <div className="mx-auto text-center md:w-4/12 my-8">
            
             <h3 className="uppercase text-4xl border-y-4 py-4">All Available <span className="text-[#B354A6]">Camps</span></h3>
        </div>

        <div className='pt-12 md:p-0 p-3 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-8'>
             {
                campsInfo?.map(info=><Card key={info._id} info={info}></Card>)
             }
        </div>
           
        </MainDiv>
    );
};

export default AvailableCamps;