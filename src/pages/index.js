import Head from "next/head"
import Banner from "../app/components/Banner"
import Header from "../app/components/Header"
import ProductFeed from "../app/components/ProductFeed"
import { SessionProvider } from "next-auth/react"
import {getSession} from "next-auth/react"

export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>
      <Header></Header>
      <main className="max-w-screen-xl mx-auto">
        {/* banner */}
        <Banner/>
        {/* product feed */}
        <ProductFeed products={products}/>
      </main>
    </div>
    
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context)
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return{props:{
    products,
    session
  }}
}

// https://fakestoreapi.com/products