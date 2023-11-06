import { BoatPublication } from "@/interfaces/backend-interfaces"


export async function getBoatPublications(): Promise<BoatPublication[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + "/api/boatPublications",
    { cache: "no-store" }
  )
  const data = await res.json()
  return data as BoatPublication[]
}

