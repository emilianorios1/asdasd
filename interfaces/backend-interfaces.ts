export interface Brand {
    id: number;
    name: string;
    websiteUrl: string;
    contactNumber: string;
    cars: CarModel[];
    planes: PlaneModel[];
    boats: BoatModel[];
  }
  
export interface CarModel {
id: number;
name: string;
brand: Brand;
brandId: number;
year: number;
engineSize: number;
numberOfDoors: number;
imageUrl: string;
carPublications: CarPublication[];
}

export interface PlaneModel {
id: number;
name: string;
brand: Brand;
brandId: number;
year: number;
wingspan: number;
maxAltitude: number;
planePublications: PlanePublication[];
}

export interface BoatModel {
id: number;
name: string;
brand: Brand;
brandId: number;
year: number;
lengthInFeet: number;
beamInFeet: number;
draftInFeet: number;
boatPublications: BoatPublication[];
}

export interface CarPublication {
id: number;
carModel: CarModel;
year: number;
carModelId: number;
mileage: number;
price: number;
transmission: string;
imageUrl: string;
description: string;
contactNumber: string;
}

export interface PlanePublication {
id: number;
planeModel: PlaneModel;
year: number;
planeModelId: number;
mileage: number;
fuelCapacity: number;
imageUrl: string;
contactNumber: string;
description: string;
flighthours: number ;

}

export interface BoatPublication {
id: number;
boatModel: BoatModel;
year: number;
boatModelId: number;
mileage: number;
capacity: number;
imageUrl: string;
contactNumber: string;
}