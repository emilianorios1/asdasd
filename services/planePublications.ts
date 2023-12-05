import {PlanePublication} from '@/interfaces/backend-interfaces';

export async function getPlanePublications(): Promise<PlanePublication[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + '/api/planePublications',
    {cache: 'no-store'}
  );
  const data = await res.json();
  return data as PlanePublication[];
}
