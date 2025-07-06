import React from "react";
import styles from "./CartDropdown.module.css";
import { useCart } from "../../context/CartContext";

const formatPrice = (price: number) =>
  price.toLocaleString("vi-VN") + " ₫";

export const CartDropdown = () => {
  const { cartItems, removeFromCart, totalPrice } = useCart();

  return (
    <div className={styles.dropdown}>
      {cartItems.length === 0 ? (
        <div className={styles.empty}>Giỏ hàng trống</div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <button className={styles.remove} onClick={() => removeFromCart(item.id)}>❌</button>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.details}>
                {item.quantity} x {formatPrice(item.price)}
              </div>
            </div>
          ))}
          <div className={styles.total}>Tổng cộng: {formatPrice(totalPrice)}</div>
          <button className={styles.viewCart}>Xem giỏ hàng</button>
        </>
      )}
    </div>
  );
};
