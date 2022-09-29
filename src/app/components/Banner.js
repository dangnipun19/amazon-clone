import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Banner() {
  return (
    <div className="relative">
        <div className="absolute w-full h-32 bg-gradient-to-t from-white to-transparent bottom-0 z-20" />
        <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={2000}>
            <div className="">
                <img loading="lazy" src="https://links.papareact.com/gi1"></img>
            </div>
            <div className="">
            <img loading="lazy" src="https://links.papareact.com/6ff"></img>
            </div>
            <div className="">
            <img loading="lazy" src="https://links.papareact.com/7ma"></img>
            </div>
        </Carousel>
    </div>
  )
}
