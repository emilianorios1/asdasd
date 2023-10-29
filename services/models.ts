import { Model } from "@/interfaces/model"

export async function getModels(): Promise<Model[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/models",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data as Model[];
}

export async function deleteModel(modelId: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/models/${modelId}`,
    {
      method: 'DELETE',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete the model');
  }
}
