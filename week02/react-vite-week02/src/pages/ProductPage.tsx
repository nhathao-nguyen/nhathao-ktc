import { useEffect, useState } from "react";
import Sidebar from "../lession07/Sidebar";
import ProductGrid from "../lession07/ProductGrid";
import Pagination from "../lession07/Pagination";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

const ProductPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const limit = 8;
  const offset = (currentPage - 1) * limit;

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?limit=200")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);

  const filteredProducts =
    selectedCategories.length === 0
      ? allProducts
      : allProducts.filter((p) => selectedCategories.includes(p.category.id));

  const totalPages = Math.ceil(filteredProducts.length / limit);
  const displayedProducts = filteredProducts.slice(offset, offset + limit);

  const handleFilter = (id: number, isChecked: boolean) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      isChecked ? [...prev, id] : prev.filter((catId) => catId !== id)
    );
  };

  return (
    <div className="flex">
      <Sidebar
        onFilter={handleFilter}
        defaultChecked={selectedCategories}
        categories={categories}
      />
      <div className="flex-1">
        <ProductGrid products={displayedProducts} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductPage;
