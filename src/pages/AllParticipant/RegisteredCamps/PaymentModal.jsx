// import PaymentPage from "./PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from "./CheckOutForm";



const stripePromise= loadStripe(import.meta.env.VITE_Payment)
const PaymentModal = ({payAmount}) => {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-sm bg-[#B354A6] py-1 text-white px-4 rounded-md" onClick={() => document.getElementById('my_modal_3').showModal()}>Pay</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                      {/* <PaymentPage></PaymentPage> */}
                      <div>
                <Elements stripe={stripePromise}>
               <CheckOutForm payAmount={payAmount}></CheckOutForm>
                </Elements>
            </div>
                </div>
            </dialog>
        </div>
    );
};

export default PaymentModal;