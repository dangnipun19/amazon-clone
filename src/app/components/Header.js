import Image from "next/image"
import{
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from "next/router"
import {useSelector} from "react-redux"
import {selectItems} from "../slices/basketSlice"

function Header() {
  const { data: session}  =  useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <header>
        {/* top nav */}
        <div className="flex items-center bg-amazon_blue flex-grow p-1 ">
            <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                <Image
                onClick={()=>router.push('/')}
                src = "https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png"
                width={150}
                height={40}
                objectFit="contain"
                className="cursor-pointer"
                />
            </div>
            {/* search bar */}
        <div className="hidden items-center h-10 rounded-md flex-grow cursor-pointer  bg-yellow-400 sm:flex hover:bg-yellow-500">
          <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text"></input>
          <SearchIcon className="h-12 p-4"></SearchIcon>
        </div>
        {/* right side */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session? signIn:signOut} className="link">
            <p>
              {session? `Hello ${session.user.name}`:"Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div onClick={()=> session && router.push('/orders')} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div onClick={()=>router.push('/checkout')} className="link relative items-center flex">
            <ShoppingCartIcon className="h-10"></ShoppingCartIcon>
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-black text-center font-bold">{items.length}</span>
            <p className=" hidden md:inline mt-2 font-extrabold md:text-sm ">Basket</p>
          </div>
        </div>
        
        </div>
        {/* bottom nav */}
        <div className="flex items-center bg-amazon_blue-light text-white space-x-3 p-2 pl-6 text-sm">
          <p className="link flex items-center ">
            <MenuIcon className="h-6 mr-1"></MenuIcon>
            All
          </p>
          <p className="link">Prime Video</p>
          <p className="link">Amazon Business</p>
          <p className="link">Today's Deals</p>
          <p className="hidden link lg:inline-flex">Electronics</p>
          <p className="hidden link lg:inline-flex">Food & Grocery</p>
          <p className="hidden link lg:inline-flex">Prime</p>
          <p className="hidden link lg:inline-flex">Buy Again</p>
          <p className="hidden link lg:inline-flex">Shopper Toolkit</p>
          <p className="hidden link lg:inline-flex">Health & Perdsonal Care</p>
        </div>
    </header>
  )
}

export default Header