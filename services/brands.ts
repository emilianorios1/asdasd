import { Brand } from "@/interfaces/backend-interfaces"

export async function getBrands(): Promise<Brand[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/brands",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data as Brand[];
}

export async function deleteBrand(brandId: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/brands/${brandId}`,
    {
      method: 'DELETE',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete the brand');
  }
}
