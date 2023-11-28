
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";




const CheckOutForm = ({campDetails,registerId}) => {
     const [error,setError]=useState('')
     const [clientSecret,setClientSecret]=useState("")
     const { user} = useAuth();
    const stripe=useStripe()
    const elements=useElements()
    const axiosSecure=useAxiosSecure()
    const navigate=useNavigate()
     

    const { name, scheduled, location, fees } = campDetails || {}


    
     useEffect(()=>{
         axiosSecure.post('/create-payment-intent',{price: fees})
         .then(res=>{
              setClientSecret(res.data.clientSecret)
         })
     },[axiosSecure,fees])
    const handleSubmit=async(event)=>{
         event.preventDefault()
         setError('')
        if(!stripe || ! elements){
            return
        }
        const card=elements.getElement(CardElement)
            if(card==null){
                 return 
            }
         const {error,paymentMethod}=await stripe.createPaymentMethod({
            type: 'card',
            card,
         })   
         if (error) {
            setError(error.message)
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
          }
          const {paymentIntent,error:ConfirmError}=await stripe.confirmCardPayment(clientSecret,{
              payment_method: {
                card: card,
                billing_details:{
                   email: user?.email || 'anonymous',
                   name: user?.displayName || 'anonymous'
                }

              }
          })
          if(ConfirmError){
           setError(ConfirmError.message)
             
          }
          else{
             if(paymentIntent.status==='succeeded'){
               const postInfo={
                email: user?.email,
                campName:name,
                 fee:fees,
                 venue: location,
                 scheduled: scheduled,
                 transactionId: paymentIntent.id
             }
             
              const res= await axiosSecure.post('/payment',postInfo)

                if(res.data.insertedId){
                    const changeInfo={
                       registerId,
                       status: 'Paid'
                    }

                    const result=await axiosSecure.put('/afterPayment',changeInfo)
                    if(result.data.modifiedCount){
                      toast.success('Payment Successfully')
                      navigate(-1)
                    }
                }
               
             }
          }
    }
    return (
        <div>
              <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button disabled={!stripe || !clientSecret} className="btn btn-sm bg-[#B354A6] text-white   mt-5" type="submit">
        Pay
      </button>
    </form>
    <p className="text-red-500 text-xl">{error}</p>
        </div>
    );
};


CheckOutForm.propTypes={
  campDetails: PropTypes.object,
  registerId: PropTypes.string
}
export default CheckOutForm;