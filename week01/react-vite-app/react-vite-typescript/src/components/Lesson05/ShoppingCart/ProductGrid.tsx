import React from "react";
import { products } from "../../data/products";
import { ProductCard } from "./ProductCard";
import styles from "./ProductGrid.module.css";

export const ProductGrid = () => {
  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};
