import {initializeApp,getApps} from 'firebase/app'
import { collection, getDocs, getFirestore,setDoc,doc,getDoc } from 'firebase/firestore';
import moment from 'moment';
import { useEffect } from 'react';


function test() {



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0f137PR1EV67TUQEetdxUBOpCYZ_gAJU",
    authDomain: "fir-7ef97.firebaseapp.com",
    projectId: "fir-7ef97",
    storageBucket: "fir-7ef97.appspot.com",
    messagingSenderId: "744766530028",
    appId: "1:744766530028:web:8f05e5d52806f07087a0c9",
    measurementId: "G-NY3MQQ8ZZG"
  };

  const app = !getApps.length?initializeApp(firebaseConfig): getApps();

  const db = getFirestore(app)
  // // const db = app.database().ref()
  // const colRef = collection(db,"userss")

  // getDocs(colRef)
  // .then((snapshot)=>{
  //   console.log(snapshot.docs)
  // })

  const fetchData = async () =>{
//     // await setDoc(doc(db, "cities", "LA"), {
//     //   name: "Los Angeles",
//     //   state: "CA",
//     //   country: "USA"
//     // });





const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

        //get user login credentials
        
        
        const docRef = collection(db, "users","nipundang19@gmail.com","orders");
      const  stripeOrders = await getDocs(docRef);

      stripeOrders.forEach(doc => {
        console.log(doc.data());
    })
    console.log("idk man",stripeOrders)

  
//     const docRef = doc(db, "users","gamebot.gen2@gmail.com","orders","cs_test_b1VB6xFKovOfbhq5FltBLiETy3SVrzttZ6aDv2rmTUa70h5agixGabsnEE");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
// // const id = docSnap.id
// // console.log("id is hereeee"+id)

// const orders = 
//     {
//       id:docSnap.id,
//       amount:docSnap.data().amount,
//       amountShipping: docSnap.data().amount_shipping,
//       images:docSnap.data().images,
//       timestamp: moment(docSnap.data().timestamp.toDate()).unix(),
//       // items:(
//       //     await stripe.checkout.sessions.listLineItems(docSnap.id,{
//       //         limit:100
//       //     })
//       // ).data,
//   }
  // console.log("finallll:",orders)
  }
  useEffect(() => {
    fetchData()
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

 

 
  return (
    <div>test</div>
  )
}

export default test