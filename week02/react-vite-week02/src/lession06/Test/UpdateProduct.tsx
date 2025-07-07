import React, { useState } from "react";

type Props = {
  product: any;
  onUpdated: (product: any) => void;
  onClose: () => void;
};

export default function UpdateProduct({ product, onUpdated, onClose }: Props) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.images[0]);
  const [description, setDescription] = useState(product.description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      title,
      price: Number(price),
      description,
      images: [image],
    };

    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products/${product.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      }
    );

    const updated = await res.json();
    console.log("update success");
    onUpdated(updated);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow w-96"
      >
        <h2 className="text-lg font-bold mb-2">Update</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 w-full mb-2"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
