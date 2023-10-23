import Image from "next/image"
import { getPublications } from "@/services/dsw-back"

export default async function Publicaciones() {
  const publications = await getPublications()
  console.log(publications)
  return (
    <div>

    







      {publications.map((publication) => {
        return (
          
          <div>

            <Image
              key={publication.id}
              src={publication.imageUrl}
              alt={publication.title}
              width={300}
              height={300}
            />
          </div>
        )
      })}
    </div>
  )
}
