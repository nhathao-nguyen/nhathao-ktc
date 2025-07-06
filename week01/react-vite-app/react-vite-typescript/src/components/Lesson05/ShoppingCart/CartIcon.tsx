import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { CartDropdown } from "./CartDropdown";
import styles from "./CartIcon.module.css";

export const CartIcon = () => {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button className={styles.icon} onClick={() => setOpen(!open)}>
        🛒 {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
      </button>
      {open && <CartDropdown />}
    </div>
  );
};
