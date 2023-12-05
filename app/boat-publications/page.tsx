import {getBoatModels} from '@/services/boatModels';
import {getBoatPublications} from '@/services/boatPublications';
import {getBrands} from '@/services/brands';

import {BoatPublicationsDataTable} from './data-table';
import {DialogBoatPublicationForm} from './dialog-form';

export default async function Page() {
  const models = await getBoatModels();
  const brands = await getBrands();
  const publications = await getBoatPublications();

  return (
    <div className="container mt-10 flex flex-col justify-center space-y-6 text-center">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold sm:text-6xl"> Boat Publications</h1>

        <DialogBoatPublicationForm models={models} brands={brands} />
      </div>

      <div className="flex justify-center">
        <BoatPublicationsDataTable
          publications={publications}
          models={models}
          brands={brands}
        />
      </div>
    </div>
  );
}
