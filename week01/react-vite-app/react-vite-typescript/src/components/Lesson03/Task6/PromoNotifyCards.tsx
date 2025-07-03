import styles from "./PromoNotifyCards.module.css";

export type Promo = {
  logo: string;
  title: string;
  amount: string;
  sub: string;
  time: string;
};
export type Notify = {
  text: string;
  icon: string;
  count: number;
};
export type PromoNotifyCardsProps = {
  promos: Promo[];
  notifies: Notify[];
};

export const PromoNotifyCards = ({ promos, notifies }: PromoNotifyCardsProps) => {
  return (
    <div className={styles.promoNotifyList}>
      {promos.map((promo, idx) => (
        <div className={styles.promoCard} key={idx}>
          <div className={styles.promoHeader}>
            <img src={promo.logo} alt={promo.title} className={styles.logo} />
            <div className={styles.promoTitle}>{promo.title}</div>
            <div className={styles.promoAmount}>{promo.amount}</div>
          </div>
          <div className={styles.promoSub}>{promo.sub}</div>
          <div className={styles.promoTime}>{promo.time}</div>
        </div>
      ))}
      {notifies.map((notify, idx) => (
        <div className={styles.notifyCard} key={idx}>
          <div className={styles.notifyText}>{notify.text}</div>
          <div className={styles.notifyRight}>
            <span className={styles.bell}>{notify.icon}</span>
            <span className={styles.notifyCount}>{notify.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
}; 