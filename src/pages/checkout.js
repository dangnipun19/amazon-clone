import Image from "next/image"
import Header from "../app/components/Header"
import {useSelector} from "react-redux"
import { selectItems, selectTotal } from "../app/slices/basketSlice"
import CheckoutProduct from "../app/components/CheckoutProduct"
import {useSession} from "next-auth/react"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"


const stripePromise = loadStripe(process.env.stripe_public_key)


function Checkout() {
    const { data: session}  =  useSession();
    const items  = useSelector(selectItems)
    const total = useSelector(selectTotal)
    
    const createCheckoutSession = async ()=>{
        const stripe = await stripePromise;
        
        
        //call backend to create checkout
        const checkoutSession = await axios.post('/api/create-checkout-session',
        {
            items:items,
            email:session.user.email
        })

        //redirect user to stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId:checkoutSession.data.id
        })
        if(result.error){
            alert(result.error.message)
        }
    }
  return (
    <div className="bg-gray-100">
      
        
        <Header> </Header>
        <main className="lg:flex max-w-screen-xl mx-auto">
        {/* left */}
        <div>
            <Image src="https://links.papareact.com/ikj" width={1020} height={250} objectFit={'contain'}></Image>
        <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
                {items.length === 0? 'your Amazon Basket is Empty.':'Shopping Basket'}
            </h1>
            {items.map((item,i)=>(
                <CheckoutProduct 
                key={i}
                id={item.id}
                title = {item.title}
                price={item.price}
                rating={item.rating}
                description = {item.description}
                category = {item.category}
                image = {item.image}
                hasPrime = {item.hasPrime}
                />
            ))}
        </div>
        </div>

        {/* right */}
        <div className=" flex flex-col bg-white p-10 shadow-md">
            {items.length>0  &&(
                <>
                    <h2 className="whitespace-nowrap">Subtotal ({items.length} items): {" "}
                    <span className="font-bold">{"\u20B9"}</span>
                     <span>{Math.floor(total*78)}</span>
                    </h2>
                    <button disabled={!session} role={'link'} onClick={createCheckoutSession} className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"}`}>
                        {!session?"Sign in to checkout":"Proceed to checkout"}
                    </button>
                </>
            )}
        </div>
        </main>
    </div>
  )
}

export default Checkout