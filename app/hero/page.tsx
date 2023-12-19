import { getCarPublications } from "@/services/carPublications";
import CarruselCars from "./carruselCars";


export default async function Hero(){


    const carsData = await getCarPublications();
    
    return(

        <div>
            <div className="flex justify-center items-center w-screen border-2 border-gray-300 mb-20"> 

                <h1 className="my-20 text-4xl md:text-6xl font-bold text-center text-yellow-600 ">Marketplace TP</h1>

            </div>

            <div className="mx-auto  px-52 min-w-max">
                <div className="bg-gray-600 rounded-r-md">
                    <div className="bg-orange-600 pl-4 py-2 w-[300px] rounded-l-md">
                         <h1 className="text-3xl font-bold text-black">Autos</h1>
                    </div>
                 </div>
            {/* Carrusel */}
            <CarruselCars cars={carsData}  />

            </div>
        
        </div>
    );
}