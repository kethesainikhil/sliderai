import DetailsComponent from "@/src/components/DetailsComponent";





export default function Page({ params }) {
  return (
    <div>
      <DetailsComponent id={params.id} />
    </div>
  )
}
