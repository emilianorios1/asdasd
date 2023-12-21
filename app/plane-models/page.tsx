import {getBrands} from '@/services/brands';
import checkAdmin from '@/services/checkAdmin';
import {getPlaneModels} from '@/services/planeModels';

import {PlaneModelsDataTable} from './data-table';
import {DialogPlaneModelForm} from './dialog-form';

export default async function Page() {
  const models = await getPlaneModels();
  const brands = await getBrands();
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return (
      <h1 className="flex h-screen items-center justify-center text-4xl font-bold sm:text-6xl">
        404 Unauthorized
      </h1>
    );
  }
  return (
    <div className="container mt-10 flex flex-col justify-center space-y-6 text-center">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold sm:text-6xl">Plane Models</h1>

        <DialogPlaneModelForm brands={brands} />
      </div>

      <div className="flex justify-center">
        <PlaneModelsDataTable models={models} brands={brands} />
      </div>
    </div>
  );
}
