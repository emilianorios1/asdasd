export interface Brand {
    id: number;
    name: string;
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
car: CarModel;
carModelId: number;
mileage: number;
price: number;
transmission: string;
imageUrl: string;
}

export interface PlanePublication {
id: number;
plane: PlaneModel;
planeModelId: number;
mileage: number;
fuelCapacity: number;
imageUrl: string;
}

export interface BoatPublication {
id: number;
boat: BoatModel;
boatModelId: number;
mileage: number;
capacity: number;
imageUrl: string;
}