export const runtime = "edge";
export const preferredRegion = "home";

const EditPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-3xl font-bold">{params.slug}</h1>
    </div>
  );
};

export default EditPage;
