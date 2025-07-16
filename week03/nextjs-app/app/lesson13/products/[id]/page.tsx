import Image from "next/image";
import { Product } from "../../types/product";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: Props) {
  // Await the params Promise
  const { id } = await params;

  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  const product: Product = await res.json();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-1/2 h-80 bg-white border rounded">
          <Image
            src={product.images?.[0] ?? "/no-image.jpg"}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600">{product.category.name}</p>
          <p className="text-red-600 text-xl font-semibold">
            {(product.price * 1000).toLocaleString()}đ
          </p>
          <p className="text-gray-600">{product.description}</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
