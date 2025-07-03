import styles from "./ContactCards.module.css";

export type Contact = {
  avatar: string;
  name: string;
  role?: string;
  icon: string;
  type: "camera" | "phone";
  style?: string;
};

export type ContactCardsProps = {
  contacts: Contact[];
};

export const ContactCards = ({ contacts }: ContactCardsProps) => {
  return (
    <div className={styles.contactList}>
      {contacts.map((c, idx) => (
        <div className={styles.contactCard} key={idx}>
          <img
            src={c.avatar}
            alt={c.name}
            className={c.type === "phone" ? styles.avatarLarge : styles.avatar}
          />
          {c.role ? (
            <div className={styles.info}>
              <div className={styles.name}>{c.name}</div>
              <div className={styles.role}>{c.role}</div>
            </div>
          ) : (
            <div className={styles.infoLarge}>{c.name}</div>
          )}
          <span className={c.type === "camera" ? styles.iconCamera : styles.iconPhone}>{c.icon}</span>
        </div>
      ))}
    </div>
  );
}; 