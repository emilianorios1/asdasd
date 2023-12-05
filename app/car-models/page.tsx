import {getBrands} from '@/services/brands';
import {getCarModels} from '@/services/carModels';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

import {CarModelsDataTable} from './data-table';
import {DialogCarModelForm} from './dialog-form';

export default async function Page() {
  const models = await getCarModels();
  const brands = await getBrands();
  return (
    <div  className="container mt-10 flex flex-col justify-center space-y-6 text-center">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold sm:text-6xl">Car Models</h1>

            <DialogCarModelForm brands={brands} />
            </div>

            <div className="flex justify-center">
            <CarModelsDataTable models={models} brands={brands} />

      </div>
    </div>
  );
}
