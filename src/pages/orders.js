import Header from "../app/components/Header"
import {useSession,getSession} from "next-auth/react"
import moment from "moment/moment";
import db from "../../firebase"
import {doc,getDocs,collection} from 'firebase/firestore'
import { useEffect } from "react";
import Order from "../app/components/Order";



function orders({orders}) {
    const {data:session} = useSession();
    // if(session){console.log(session)
    
    // }


     console.log(orders)
  return (
    <div>
        <Header></Header>
        {/* {console.log(session?.user.email)} */}
        <main className="max-w-screen-lg mx-auto p-10">
            <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>
        
        {session?(
            <h2>{orders.length} Orders</h2>
        ):  (
            <h2>Please sign in to see your orders</h2>
        )
        }
        <div className="mt-5 space-y-4">
            {orders?.map(({id,amount,amountShipping,items,timestamp,images}) =>(
                <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
                />
            ))}
        </div>
        </main>
    </div>
  )
}

export default orders

export async function getServerSideProps(context){

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

        //get user login credentials
        const session = await getSession(context);
        

        if(!session){
            return{
                props:{}
            }
        }
        
        const docRef = collection(db, "users",session.user.email,"orders");
      const  stripeOrders = await getDocs(docRef);

    //   stripeOrders.forEach(doc => {
    //     console.log(doc.data());
    // })
      // const id = docSnap.id
      // console.log("id is hereeee"+id)
     
        // if (stripeOrders.exists()) {
        //     console.log("Document data:", stripeOrders.data());
        //   } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        //   }
        //   // const id = docSnap.id
        //   // console.log("id is hereeee"+id)
          
        
//         const orders = {
//       id:stripeOrders.id,
//       amount:stripeOrders.data().amount,
//       amountShipping: stripeOrders.data().amount_shipping,
//       images:stripeOrders.data().images,
//       timestamp: moment(stripeOrders.data().timestamp.toDate()).unix(),
//       items:(
//           await stripe.checkout.sessions.listLineItems(stripeOrders.id,{
//               limit:100
//           })
//       ).data,
//   }

        const orders = await Promise.all(stripeOrders.docs.map(async(order)=>({
            id:order.id,
            amount:order.data().amount,
            amountShipping: order.data().amount_shipping,
            images:order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items:(
                await stripe.checkout.sessions.listLineItems(order.id,{
                    limit:100
                })
            ).data,
        }))) 
    return{
        props:{
            orders
        }}
}
// export async function getServerSideProps(context){
//     const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//     //get user login credentials
//     const session = await getSession(context);
//     console.log(session)

//     if(!session){
//         return{
//             props:{}
//         }
//     }

//     // const stripeOrders =  await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp','desc').get()
//     const docRef = doc(db,'users',session.user.email);
//     const stripeOrders = await getDoc(docRef);
//     if (stripeOrders.exists()) {
//         console.log("Document data:", stripeOrders.data());

//     }
//     else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//       }

//     const orders = await Promise.all(
//         stripeOrders.docs.map(async(order)=>({
//             id:order.id,
//             amount:order.data().amount,
//             amountShipping: order.data().amount_shipping,
//             images:order.data().images,
//             timestamp: moment(order.data().timestamp.toDate()).unix(),
//             items:(
//                 await stripe.checkout.sessions.listLineItems(order.id,{
//                     limit:100
//                 })
//             ).data,
//         }))
//     )

//     return{
//         props:{
//             orders
//         }
//     }

//  }