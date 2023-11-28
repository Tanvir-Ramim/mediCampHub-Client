import { Elements } from "@stripe/react-stripe-js";

import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from "./CheckOutForm";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../../../components/errorpage/ErrorPage";
import Skeleton from "react-loading-skeleton";
import useAxiosNormal from "../../../hooks/useAxiosNormal";
import { Helmet } from "react-helmet-async";



const stripePromise= loadStripe(import.meta.env.VITE_Payment)
const PaymentPage = () => {
    const axiosNormal=useAxiosNormal()
    const urlParams=new URLSearchParams(window.location.search)
    const id=urlParams.get('id')
     const campId=id?.split(',')[0]
     const registerId=id?.split(',')[1]
    const campsDetailsFn = async () => {
        const res = await axiosNormal.get(`/camp/${campId}`)
        return res.data
    }

    const { data: campDetails, isLoading, isPending, isError } = useQuery({
        queryKey: ['fee', id],
        queryFn: campsDetailsFn
    })

    if (isError) {
        return <ErrorPage></ErrorPage>
    }

    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }

    

    return (
        <div>
            <Helmet><title>MCH | CampsDetails</title></Helmet>
            <div className="mx-auto p-5 text-center md:w-4/12 my-8 md:mt-10 mb-14">
                <h3 className="uppercase text-4xl border-y-4 py-4">Payment Here</h3>
            </div>
            <div className="md:w-4/5 w-11/12 lg:w-3/4 mx-auto border-2 p-2">
                <div className="mb-5 font-semibold"><span className="text-lg font-normal ">Amount:</span> ${campDetails?.fees}</div>
                <Elements stripe={stripePromise}>
             <CheckOutForm registerId={registerId} campDetails={campDetails}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;