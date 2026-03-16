import VendorPublicProfileClient from "./VendorPublicProfileClient";

export function generateStaticParams() {
  return [
    { id: '123' },
    { id: '102938' },
  ];
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <VendorPublicProfileClient params={params} />;
}
