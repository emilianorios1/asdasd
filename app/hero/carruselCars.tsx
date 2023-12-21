'use client';

// Swiper
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//Imagenes
import Image from 'next/image';
import {CarPublication} from '@/interfaces/backend-interfaces';
import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules';

interface CarruselCarsProps {
  cars: CarPublication[];
}

const CarruselCars: React.FC<CarruselCarsProps> = ({cars}) => {
  return (
    <div id="Page" className="sm:items-center  lg:max-w-[1500px] ">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
          type: 'bullets',
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
        {/* WORKSHOPS */}

        {/* MAPEA LOS WORKSHOPS */}
        {cars.map((car) => (
          <SwiperSlide key={car.id}>
            <a className="cursor-pointer ">
              {/* Card */}
              <div className="max-h-[500px]  pt-5">
                <div>
                  <Image
                    src={car.imageUrl}
                    width="800"
                    height="100"
                    alt={`Car Image`}
                    className="mb-2 rounded-t-md md:float-right xl:max-h-fit "
                  ></Image>
                </div>
                <div className="bg-gray-600  ">
                  <h1 className="mx-3 my-2 font-bold">{car.carModel.name}</h1>
                  <h1 className="m-3">{car.description}</h1>
                  <p className=" rounded-b-md bg-orange-600 py-2 font-semibold">
                    &nbsp;&nbsp; Precio: ${car.price}
                  </p>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarruselCars;
