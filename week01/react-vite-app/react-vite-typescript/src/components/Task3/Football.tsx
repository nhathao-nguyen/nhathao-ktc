import FootballStyle from "./Football.module.css";

export type FootballProps = {
  match: {
    time: string;
    team1: string;
    flag1: string;
    score: string;
    team2: string;
    flag2: string;
  };
  club: {
    logo: string;
    name: string;
  };
  cardInfo: {
    avatar: string;
    name: string;
    type: string;
    number: string;
    eyeIcon?: string;
  };
  dashboard: {
    highlights: string[];
    feeds: string[];
    title: string;
    desc: string;
    percent: number;
  };
};

export const Football = ({ match, club, cardInfo, dashboard }: FootballProps) => {
  return (
    <div className={FootballStyle.cardList}>
      {/* Match Card */}
      <div className={FootballStyle.card}>
        <div className={FootballStyle.cardHeader}>
          <span className={FootballStyle.time}>{match.time}</span>
          <span className={FootballStyle.menu}>•••</span>
        </div>
        <div className={FootballStyle.matchInfo}>
          <span className={FootballStyle.team}>
            {match.team1} <span className={FootballStyle.flag}>{match.flag1}</span>
          </span>
          <span className={FootballStyle.score}>{match.score}</span>
          <span className={FootballStyle.team}>
            <span className={FootballStyle.flag}>{match.flag2}</span> {match.team2}
          </span>
        </div>
      </div>

      {/* Club Card */}
      <div className={FootballStyle.card}>
        <div className={FootballStyle.clubInfo}>
          <span className={FootballStyle.clubLogo}>{club.logo}</span>
          <span className={FootballStyle.clubName}>{club.name}</span>
          <span className={FootballStyle.menu}>•••</span>
        </div>
      </div>

      {/* Card Info */}
      <div className={FootballStyle.card}>
        <div className={FootballStyle.cardInfo}>
          <img
            src={cardInfo.avatar}
            alt="avatar"
            className={FootballStyle.avatar}
          />
          <div className={FootballStyle.cardDetails}>
            <div className={FootballStyle.cardName}>{cardInfo.name}</div>
            <div className={FootballStyle.cardTypeRow}>
              <span className={FootballStyle.cardType}>{cardInfo.type}</span>
              <span className={FootballStyle.cardNumber}>{cardInfo.number}</span>
            </div>
          </div>
          <span className={FootballStyle.eyeIcon}>{cardInfo.eyeIcon || "👁️‍🗨️"}</span>
        </div>
      </div>

      {/* Dashboard Card */}
      <div className={FootballStyle.card}>
        <div className={FootballStyle.dashboardHeader}>
          {dashboard.highlights.map((h, i) => (
            <span key={i} className={FootballStyle.highlight}>{h}</span>
          ))}
          {dashboard.feeds.map((f, i) => (
            <span key={i} className={FootballStyle.feeds}>{f}</span>
          ))}
          <span className={FootballStyle.menu}>•••</span>
        </div>
        <div className={FootballStyle.dashboardContent}>
          <div className={FootballStyle.dashboardTitle}>{dashboard.title}</div>
          <div className={FootballStyle.dashboardDesc}>{dashboard.desc}</div>
          <div className={FootballStyle.progressBarBg}>
            <div className={FootballStyle.progressBarFill} style={{ width: `${dashboard.percent}%` }}></div>
          </div>
          <div className={FootballStyle.progressPercent}>{dashboard.percent}%</div>
        </div>
      </div>
    </div>
  );
};
