import { Category } from "@/interfaces/category"
import { Publication } from "@/interfaces/publication"

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/categories",
    { cache: "no-store" }
  )
  const data = await res.json()
  return data as Category[]
}


export async function getPublications(): Promise<Publication[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/publications",
    { cache: "no-store" }
  )
  const data = await res.json()
  return data as Publication[]
}


