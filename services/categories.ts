import { Category } from "@/interfaces/category"

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/categories",
    { cache: "no-store" }
  )
  const data = await res.json()
  return data as Category[]
}

export async function deleteCategory(categoryId: number): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${categoryId}`,
    {
      method: 'DELETE',
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete the category');
  }
}
