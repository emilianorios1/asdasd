import {CarModel} from '@/interfaces/backend-interfaces';

export async function getCarModels(): Promise<CarModel[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/api/carModels',
    {cache: 'no-store'}
  );
  const data = await res.json();
  return data as CarModel[];
}

export async function deleteCarModel(modelId: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carModels/${modelId}`,
    {
      method: 'DELETE',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete the model');
  }
}
