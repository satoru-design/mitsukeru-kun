import CategoryDetailClient from "./CategoryDetailClient";

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function Page() {
  return <CategoryDetailClient />;
}
