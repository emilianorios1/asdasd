import {PlaneModel} from '@/interfaces/backend-interfaces';

export async function getPlaneModels(): Promise<PlaneModel[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/api/planeModels',
    {cache: 'no-store'}
  );
  const data = await res.json();
  return data as PlaneModel[];
}

export async function deletePlaneModel(modelId: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/planeModels/${modelId}`,
    {
      method: 'DELETE',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete the model');
  }
}
