import { useParams } from "react-router-dom";
import MainDiv from "../../shared/MainDiv/MainDiv";
import useAxiosNormal from "../../hooks/useAxiosNormal";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import ErrorPage from "../../components/errorpage/ErrorPage";
import { GiCampingTent } from "react-icons/gi";
import { FaDollarSign, FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { MdDescription, MdEmojiPeople, MdMedicalServices } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import RegisterPage from "../../components/RegisterPage/RegisterPage";
import useRole from "../../hooks/useRole";
import { Helmet } from "react-helmet-async";

const Details = () => {

    const { id } = useParams()
    const axiosNormal = useAxiosNormal()
    const { role } = useRole()

    const campsDetailsFn = async () => {
        const res = await axiosNormal.get(`/camp/${id}`)
        return res.data
    }

    const { data: campDetails, isLoading, isPending, isError, refetch } = useQuery({
        queryKey: ['campDetails', id],
        queryFn: campsDetailsFn
    })

    if (isError) {
        return <ErrorPage></ErrorPage>
    }

    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }

    const { _id, name, services, scheduled, participant, location, image, fees, audience, healthCareName, details } = campDetails || {}
    const forRegister = {
        name, scheduled, location, fees
    }

    return (
        <MainDiv>
                 <Helmet><title>MCH | CampsDetails</title></Helmet>
            <div className="mx-auto text-center md:w-4/12 my-8 md:mt-10">
                <h3 className="uppercase text-4xl border-y-4 py-4">Camp Details </h3>
            </div>
            <div>
                <div className="flex lg:flex-row flex-col gap-5 lg:p-0 p-5 md:mt-16">
                    <div className="flex justify-center   ">
                        <img className="md:w-[700px] md:h-[400px]" src={image} alt="" />
                    </div>
                    <div className="flex-1 ">
                        <div className="space-y-5">
                            <div className="flex md:flex-row flex-col md:items-center  mb-2 md:gap-5 gap-2">
                                <h1 className="text-xl flex items-center gap-1 font-medium"> <GiCampingTent />Camp Name: <span className="font-normal">{name}</span></h1>

                                <hr className="border-l-2 w-3 hidden sm:block  border-[#B354A6]" />
                                <p className="font-medium flex items-center gap-1"> <FaLocationDot className="text-sm" /> Location: <span className="font-normal">{location}</span> </p>

                            </div>
                            <div className="flex md:flex-row flex-col md:items-center  mb-2 md:gap-5 gap-2">
                                <h1 className="text-xl flex items-center gap-1 font-medium"><MdMedicalServices /> Specialized Services: <span className="font-normal">{services}</span></h1>
                                <hr className="border-l-2 w-3 hidden sm:block  border-[#B354A6]" />
                                <p className="font-medium flex items-center gap-1"> <IoTimeSharp />Scheduled: <span className="font-normal">{scheduled}</span></p>
                            </div>
                            <div className="flex md:flex-row flex-col md:items-center  mb-2 md:gap-5 gap-2">
                                <h1 className="text-xl flex items-center gap-1 font-medium"><FaUserDoctor /> Healthcare
                                    Professionals: <span className="font-normal">{healthCareName}</span></h1>
                                <hr className="border-l-2 w-3 hidden sm:block  border-[#B354A6]" />
                                <p className="font-medium flex items-center gap-1"> <MdEmojiPeople />Audience: <span className="font-normal">{audience}</span></p>

                            </div>
                            <div className="flex flex-row  md:items-center  mb-2 md:gap-5 gap-2">
                                <h1 className="text-xl flex items-center gap-1 font-medium"><FaDollarSign /> Fees: <span className="font-normal"> {fees}</span></h1>
                                <hr className="border-l-2 w-3 hidden sm:block  border-[#B354A6]" />

                                <p className="font-medium flex items-center gap-1"> <IoIosPeople /> Participants: <span className="font-normal">{participant}</span></p>
                                <hr className="border-l-2 w-3 hidden sm:block  border-[#B354A6]" />
                                
                                {
                                     role==='Participant' ?  <RegisterPage participant={participant} forRegister={forRegister} refetch={refetch} id={_id}></RegisterPage> : <h1 className="text-[#B354A6]">Only Registration For Participant</h1>
                                }
                            </div>
                            <div>
                                <h1 className="text-lg items-center gap-1  flex  font-semibold">
                                    <MdDescription className="" /> Description :
                                </h1>
                                <h1 className="text-xl mt-1">
                                    {details}
                                </h1>

                            </div>


                        </div>

                    </div>
                </div>

            </div>
        </MainDiv>
    );
};

export default Details;