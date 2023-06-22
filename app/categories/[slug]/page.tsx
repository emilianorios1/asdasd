export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>ID: {params.slug}
    </div>
    )
}