interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((p) => (
        <div key={p.id} className="border p-2 rounded shadow hover:shadow-lg">
          <img
            src={p.images?.[0] || ""}
            alt={p.title}
            className="h-32 object-contain mx-auto"
          />
          <h3 className="mt-2 font-semibold">{p.title}</h3>
          <p className="text-red-500 font-bold">{p.price.toLocaleString()}đ</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
