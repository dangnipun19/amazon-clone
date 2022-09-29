import {initializeApp,getApps} from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore';

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
  // const db = app.database().ref()
  // const colRef = collection(db,"users")

  // getDocs(colRef)
  // .then((snapshot)=>{
  //   console.log(snapshot.data())
  // })

  export default db;