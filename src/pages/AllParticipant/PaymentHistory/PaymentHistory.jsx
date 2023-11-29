import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ErrorPage from "../../../components/errorpage/ErrorPage";
import Skeleton from "react-loading-skeleton";
import { Helmet } from "react-helmet-async";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const allPaymentFn = async () => {
        const res = await axiosSecure.get(`/emailPayment?email=${user?.email}`)
        return res.data
    }

    const { data: allPayment, isError, isLoading, isPending } = useQuery({
        queryKey: ['allPayment', user?.email],
        queryFn: allPaymentFn
    })

    if (isError) {
        return <ErrorPage></ErrorPage>
    }

    if (isLoading || isPending) {
        return <Skeleton count={10} />
    }
    return (
        <div >
            <Helmet><title>MCH | Payment History </title></Helmet>
            <div className="mx-auto text-center md:w-4/12 my-8 md:mt-10">
                <h3 className="uppercase text-4xl border-y-4 py-4"> Payment <span className="text-[#B354A6]">History</span> </h3>
            </div>
            <div className="p-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>location</th>
                            <th>scheduled</th>
                            <th>Amount</th>
                            <th>TransactionId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPayment?.map((item, index) => <tr key={item._id}>
                                <th >{index + 1}</th>
                                <th >{item?.campName}</th>
                                <th >{item?.venue}</th>
                                <th >{item?.scheduled}</th>
                                <th >{item?.fee}</th>
                                <th >{item?.transactionId}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;