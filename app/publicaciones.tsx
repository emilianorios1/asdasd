"use client"

import Image from "next/image"
import { getPublications } from "@/services/dsw-back"
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";


export default async function Publicaciones() {
  const publications = await getPublications()
  console.log(publications)
  return (
    <div>
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={0}
            loop={true}
            pagination={{
              clickable: true,
              type: "bullets",
            }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="carruselOfTute"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
          >

          
    

      {publications.map((publication) => (
        <SwiperSlide>
        <div>
          <Image
            key={publication.id}
            src={publication.imageUrl}
            alt={publication.title}
            width={300}
            height={300}
          />
        </div>
        </SwiperSlide>
      ))}

</Swiper>
    </div>
  )
}
