import { BoatModel } from "@/interfaces/backend-interfaces"

export async function getBoatModels(): Promise<BoatModel[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/boatModels",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data as BoatModel[];
}

export async function deleteBoatModel(modelId: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boatModels/${modelId}`,
    {
      method: 'DELETE',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete the model');
  }
}