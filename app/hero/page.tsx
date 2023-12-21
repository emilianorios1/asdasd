import {getCarPublications} from '@/services/carPublications';

import CarruselCars from './carruselCars';

export default async function Hero() {
  const carsData = await getCarPublications();

  return (
    <div>
      <div className="mb-20 flex w-screen items-center justify-center border-2 border-gray-300">
        <h1 className="my-20 text-center text-4xl font-bold text-yellow-600 md:text-6xl ">
          Marketplace TP
        </h1>
      </div>
      <div className="mx-auto  min-w-max px-52">
        <div className="rounded-r-md bg-gray-600">
          <div className="w-[300px] rounded-l-md bg-orange-600 py-2 pl-4">
            <h1 className="text-3xl font-bold text-black">Autos</h1>
          </div>
        </div>
        {/* Carrusel */}
        <CarruselCars cars={carsData} />
      </div>
    </div>
  );
}
