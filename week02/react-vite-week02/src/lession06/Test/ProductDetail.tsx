import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UpdateProduct from "./UpdateProduct";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("error product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdated = (updated: any) => {
    setProduct(updated);
    setShowUpdateForm(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Not found </p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back
      </Link>

      <div className="relative">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <button
          onClick={() => setShowUpdateForm(true)}
          className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow"
        >
          Update
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-2">Price: ${product.price}</p>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-sm text-gray-500">
        Category: {product.category?.name}
      </p>

      {showUpdateForm && (
        <UpdateProduct
          product={product}
          onUpdated={handleUpdated}
          onClose={() => setShowUpdateForm(false)}
        />
      )}
    </div>
  );
}
