import styles from "./TeamsCards.module.css";

export type Team = {
  avatars: string[];
  name: string;
  desc?: string;
  bg: string;
  nameStyle?: string;
  descStyle?: string;
};

export type TeamsCardsProps = {
  teams: Team[];
};

export const TeamsCards = ({ teams }: TeamsCardsProps) => {
  return (
    <div className={styles.teamsList}>
      {teams.map((team, idx) => (
        <div className={`${styles.teamCard} ${styles[team.bg]}`} key={idx}>
          <div className={styles.avatarsWrapper}>
            {team.avatars.map((a, i) => (
              <img
                key={i}
                src={a}
                alt={team.name + i}
                className={team.avatars.length > 1 ? styles.avatarSmall : styles.avatar}
              />
            ))}
          </div>
          <div className={styles.teamInfo}>
            <span className={team.nameStyle ? styles[team.nameStyle] : styles.teamName}>{team.name}</span>
            {team.desc && <span className={team.descStyle ? styles[team.descStyle] : styles.teamDesc}>{team.desc}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}; 