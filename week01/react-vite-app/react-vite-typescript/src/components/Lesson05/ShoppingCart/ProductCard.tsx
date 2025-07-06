import React from "react";
import type { Product } from "../../types/Product";
import { useCart } from "../../context/CartContext";
import styles from "./ProductCard.module.css";

type Props = {
  product: Product;
};

const formatPrice = (price: number) =>
  price.toLocaleString("vi-VN") + " ₫";

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cartItems, addToCart, changeQuantity } = useCart();
  const item = cartItems.find((i) => i.id === product.id);

  return (
    <div className={styles.card}>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.price}>{formatPrice(product.price)}</div>
      <div className={styles.controls}>
        {item ? (
          <>
            <button onClick={() => changeQuantity(product.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => changeQuantity(product.id, item.quantity + 1)}>+</button>
          </>
        ) : (
          <button onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
        )}
      </div>
    </div>
  );
};
