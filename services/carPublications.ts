import { CarPublication } from "@/interfaces/backend-interfaces"


export async function getCarPublications(): Promise<CarPublication[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/carPublications",
    { cache: "no-store" }
  )
  const data = await res.json()
  return data as CarPublication[]
}

