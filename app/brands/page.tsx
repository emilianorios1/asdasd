import {getBrands} from '@/services/brands';
import checkAdmin from '@/services/checkAdmin';

import {DialogBrandForm} from '@/app/brands/dialog-form';

import {BrandsDataTable} from './data-table';

export default async function CategoriesPage() {
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
        <h1 className="text-4xl font-bold sm:text-6xl">Brands</h1>
        <DialogBrandForm />
      </div>

      <div className="flex justify-center">
        <BrandsDataTable brands={brands} />
      </div>
    </div>
  );
}
