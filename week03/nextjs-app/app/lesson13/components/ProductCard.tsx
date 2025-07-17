
import Link from "next/link";
import { Product } from "../types/product";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border rounded-lg shadow hover:shadow-md transition duration-300 flex flex-col overflow-hidden">
      <Link
        href={`/lesson13/products/${product.id}`}
        className="flex flex-col h-full "
      >
        <div className="relative w-full h-48 bg-gray-50  ">
          <Image
            src={product.images?.[0] ?? "/no-image.jpg"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 20vw"
            className="object-contain pt-2  "
          />
        </div>

        <div className="p-3 flex flex-col gap-1 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 h-[2.5rem]">
            {product.title}
          </h2>
          <div>
            <p className="text-red-600 font-bold text-sm">
              {(product.price * 1000).toLocaleString()}đ
            </p>
            <p className="text-xs text-gray-400 line-through">
              {((product.price + 10) * 1000).toLocaleString()}đ
            </p>
          </div>
          <button className="mt-auto bg-blue-50 text-blue-600 text-sm font-medium py-1.5 rounded hover:bg-blue-500 hover:text-white transition">
            Coming soon
          </button>
        </div>
      </Link>
    </div>
  );
}
