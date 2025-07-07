import React, { useState } from "react";

type Props = {
  onCreated: (product: any) => void;
};

export default function CreateProduct({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      title,
      price: Number(price),
      images: [image],
      description: "",
      categoryId: 15,
    };

    const res = await fetch("https://api.escuelajs.co/api/v1/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const created = await res.json();
    console.log("create success");
    onCreated(created);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded">
      <h2 className="font-bold mb-2">Create</h2>
      <input
        placeholder="name product"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        placeholder="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        placeholder="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </form>
  );
}
