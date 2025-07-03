import styles from "./WeatherCards.module.css";

export type WeatherCardType =
  | {
      type: "landscape";
      avatar: string;
      title: string;
      desc: string;
      menu?: boolean;
      bg?: string;
    }
  | {
      type: "mountain";
      avatar: string;
      title: string;
      desc: string;
      icon: string;
    }
  | {
      type: "schedule";
      icon: string;
      title: string;
      desc: string;
      play?: boolean;
      bg?: string;
    }
  | { type: "weatherWeek"; days: { icon: string; label: string }[] }
  | {
      type: "seattle";
      title: string;
      desc: string;
      temp: string;
      icon: string;
      bg?: string;
    }
  | {
      type: "scheduleWeek";
      title: string;
      desc: string;
      menu?: boolean;
      days: { icon: string; label: string; time: string }[];
    }
  | {
      type: "calendar";
      month: string;
      day: string;
      weekday: string;
      time: string;
    };

export type WeatherCardsProps = {
  cards: WeatherCardType[];
};

export const WeatherCards = ({ cards }: WeatherCardsProps) => {
  return (
    <div className={styles.weatherList}>
      {cards.map((card, idx) => {
        if (card.type === "landscape") {
          return (
            <div
              className={`${styles.card} ${card.bg ? styles[card.bg] : ""}`}
              key={idx}>
              <img
                src={card.avatar}
                alt={card.title}
                className={styles.avatar}
              />
              <div className={styles.info}>
                <div className={styles.title}>{card.title}</div>
                <div className={styles.desc}>{card.desc}</div>
              </div>
              {card.menu && <span className={styles.menu}>•••</span>}
            </div>
          );
        }
        if (card.type === "mountain") {
          return (
            <div className={styles.card} key={idx}>
              <img
                src={card.avatar}
                alt={card.title}
                className={styles.avatar}
              />
              <div className={styles.info}>
                <div className={styles.title}>{card.title}</div>
                <div className={styles.desc}>{card.desc}</div>
              </div>
              <span className={styles.weatherIcon}>{card.icon}</span>
            </div>
          );
        }
        if (card.type === "schedule") {
          return (
            <div
              className={`${styles.card} ${card.bg ? styles[card.bg] : ""}`}
              key={idx}>
              <span className={styles.scheduleIcon}>{card.icon}</span>
              <div className={styles.info}>
                <div className={styles.title}>{card.title}</div>
                <div className={styles.desc}>{card.desc}</div>
              </div>
              {card.play && <span className={styles.playIcon}>▶️</span>}
            </div>
          );
        }
        if (card.type === "weatherWeek") {
          return (
            <div className={styles.card} key={idx}>
              <div className={styles.weatherWeek}>
                {card.days.map((d, i) => (
                  <div className={styles.day} key={i}>
                    <span>{d.icon}</span>
                    <div>{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        if (card.type === "seattle") {
          return (
            <div
              className={`${styles.card} ${card.bg ? styles[card.bg] : ""}`}
              key={idx}>
              <div className={styles.seattleLeft}>
                <div className={styles.seattleTitle}>{card.title}</div>
                <div className={styles.seattleDesc}>{card.desc}</div>
              </div>
              <div className={styles.seattleTemp}>{card.temp}</div>
              <span className={styles.seattleIcon}>{card.icon}</span>
            </div>
          );
        }
        if (card.type === "scheduleWeek") {
          return (
            <div className={styles.card} key={idx}>
              <div className={styles.scheduleHeader}>
                <div>
                  <div className={styles.title}>{card.title}</div>
                  <div className={styles.desc}>{card.desc}</div>
                </div>
                {card.menu && <span className={styles.menu}>•••</span>}
              </div>
              <div className={styles.weatherWeekSmall}>
                {card.days.map((d, i) => (
                  <div className={styles.daySmall} key={i}>
                    <span>{d.icon}</span>
                    <div>{d.label}</div>
                    <div className={styles.time}>{d.time}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        if (card.type === "calendar") {
          return (
            <div className={styles.card} key={idx}>
              <div className={styles.calendarRow}>
                <div className={styles.calendarDate}>
                  <div className={styles.month}>{card.month}</div>
                  <div className={styles.day}>{card.day}</div>
                </div>
                <div className={styles.calendarInfo}>
                  <div className={styles.calendarWeekday}>{card.weekday}</div>
                  <div className={styles.calendarTime}>{card.time}</div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
