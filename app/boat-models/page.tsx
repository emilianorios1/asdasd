import {getBrands} from '@/services/brands';
import {getBoatModels} from '@/services/boatModels';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

import {BoatModelsDataTable} from './data-table';
import {DialogBoatModelForm} from './dialog-form';

export default async function Page() {
  const models = await getBoatModels();
  const brands = await getBrands();
  return (
    <div  className="container mt-10 flex flex-col justify-center space-y-6 text-center">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold sm:text-6xl">Boat Models</h1>

            <DialogBoatModelForm brands={brands} />
            </div>

            <div className="flex justify-center">
            <BoatModelsDataTable models={models} brands={brands} />

      </div>
    </div>
  );
}
