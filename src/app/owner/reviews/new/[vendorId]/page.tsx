import NewReviewClient from "./NewReviewClient";

export function generateStaticParams() {
  return [
    { vendorId: '123' },
    { vendorId: '102938' },
  ];
}

export default function Page({ params }: { params: Promise<{ vendorId: string }> }) {
  return <NewReviewClient params={params} />;
}
