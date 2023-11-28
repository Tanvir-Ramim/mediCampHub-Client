

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";




const CheckOutForm = ({payAmount}) => {
     const [error,setError]=useState('')
     const [clientSecret,setClientSecret]=useState("")
     const   { user} = useAuth();
    const stripe=useStripe()
    const elements=useElements()
    const axiosSecure=useAxiosSecure()
    const [transationId,setTransactionId]=useState('')
//    const [cart]=useCart()
   const totalPrice= '55.00'
   console.log(payAmount)
    console.log(totalPrice)
     useEffect(()=>{
         axiosSecure.post('/create-payment-intent',{price: totalPrice})
         .then(res=>{
              setClientSecret(res.data.clientSecret)
         })
     },[axiosSecure])

    const handleSubmit=async(event)=>{
         event.preventDefault()
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
            console.log('[error]', error);
            setError(error.message)
          } else {
            // console.log('[PaymentMethod]', paymentMethod);
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
             setError('confirmError',ConfirmError)
           
          }
          else{
             if(paymentIntent.status==='succeeded'){
              console.log(paymentIntent)
               setTransactionId(paymentIntent.id)
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
      <button disabled={!stripe || !clientSecret} className="btn btn-sm btn-primary mt-5" type="submit">
        Pay
      </button>
    </form>
    <p className="text-red-500 text-xl">{error}</p>
    {
      transationId && <p className="text-xl text-red-500">{transationId}</p>
    }
        </div>
    );
};

export default CheckOutForm;