import {getBrands} from '@/services/brands';
import {getPlaneModels} from '@/services/planeModels';
import {getPlanePublications} from '@/services/planePublications';


import {PlanePublicationsDataTable} from './data-table';
import {DialogPlanePublicationForm} from './dialog-form';

export default async function Page() {
  const models = await getPlaneModels();
  const brands = await getBrands();
  const publications = await getPlanePublications();

  return (
    <div  className="container mt-10 flex flex-col justify-center space-y-6 text-center">
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-4xl font-bold sm:text-6xl"> Plane Publications</h1>
    
            <DialogPlanePublicationForm models={models} brands={brands} />
              </div>

              <div className="flex justify-center">
            <PlanePublicationsDataTable
              publications={publications}
              models={models}
              brands={brands}
            />

      </div>
    </div>
  );
}
