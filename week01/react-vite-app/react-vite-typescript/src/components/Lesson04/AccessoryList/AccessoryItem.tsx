import React from "react";
import styles from "./Accessory.module.css";

interface IAccessoryProps {
  thumbnail: string;
  title: string;
  addPrice?: string;
  oldPrice?: string;
  sale?: string;
}

const AccessoryItem = ({
  thumbnail,
  title,
  addPrice,
  oldPrice,
  sale,
}: IAccessoryProps) => {
  return (
    <div className={styles.accessory_item}>
      <div className={styles.accessory_img_wrapper}>
        <img src={thumbnail} alt={title} className={styles.accessory_img} />
        {sale && <span className={styles.accessory_sale}>{sale}</span>}
      </div>
      <h3 className={styles.accessory_title}>{title}</h3>
      <div className={styles.accessory_price_row}>
        <span className={styles.accessory_price}>{addPrice}</span>
        {oldPrice && <span className={styles.accessory_old_price}>{oldPrice}</span>}
      </div>
    </div>
  );
};

export default AccessoryItem;
