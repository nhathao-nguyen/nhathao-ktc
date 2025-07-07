import { useEffect, useState } from "react";
import UpdateProduct from "./UpdateProduct";
import CreateProduct from "./CreateProduct";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  // creationAt: string;
  // updatedAt: string;
};

type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  // creationAt: string;
  // updatedAt: string;
};

const apiUrl = "https://api.escuelajs.co/api/v1/products";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreate = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
    setShowCreate(false);
  };

  const handleUpdate = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setSelectedProduct(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowCreate(true)}
        >
          + Create
        </button>
      </div>

      {showCreate && <CreateProduct onCreated={handleCreate} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <Link to={`/products/${product.id}`}>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-2 cursor-pointer hover:opacity-80 transition"
              />
            </Link>
            <h2 className="font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-600">{product.category.name}</p>
            <div className="mt-2 flex gap-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => setSelectedProduct(product)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          onUpdated={handleUpdate}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
