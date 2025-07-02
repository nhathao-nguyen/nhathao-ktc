import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import { Apple, Youtube, Facebook, ArrowRight } from "lucide-react";
import Section from "./components/Group/SectionComponents";
import { Football } from "./components/Task3/Football";
import { ContactCards } from "./components/Task4/ContactCards";
import { TeamsCards } from "./components/Task5/TeamsCards";
import { PromoNotifyCards } from "./components/Task6/PromoNotifyCards";
import { WeatherCards } from "./components/Task7/WeatherCards";
import type { FootballProps } from "./components/Task3/Football";
import type { Contact } from "./components/Task4/ContactCards";
import type { Team } from "./components/Task5/TeamsCards";
import type { Promo, Notify } from "./components/Task6/PromoNotifyCards";
import type { WeatherCardType } from "./components/Task7/WeatherCards";

import { Search, Menu, Settings2, Phone } from "lucide-react";

const footballData: FootballProps = {
  match: {
    time: "7'",
    team1: "Spain",
    flag1: "🇪🇸",
    score: "0 : 0",
    team2: "France",
    flag2: "🇫🇷",
  },
  club: {
    logo: "🟠",
    name: "Manchester United",
  },
  cardInfo: {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Wade Warren",
    type: "VISA",
    number: "4293 3242 ....",
    eyeIcon: "👁️‍🗨️",
  },
  dashboard: {
    highlights: ["Highlight"],
    feeds: ["Feeds"],
    title: "Dashboard",
    desc: "Business management service",
    percent: 80,
  },
};

const contacts: Contact[] = [
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Yolanda",
    role: "Web Development",
    icon: "📷",
    type: "camera",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "María",
    icon: "📞",
    type: "phone",
  },
];

const teams: Team[] = [
  {
    avatars: ["https://randomuser.me/api/portraits/women/44.jpg"],
    name: "Miriam Jimenez",
    bg: "bgCyan",
  },
  {
    avatars: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/65.jpg",
    ],
    name: "Teams",
    desc: "Two currently",
    bg: "bgPurple",
    nameStyle: "teamTitle",
    descStyle: "teamDesc",
  },
  {
    avatars: [
      "https://randomuser.me/api/portraits/men/45.jpg",
      "https://randomuser.me/api/portraits/women/66.jpg",
    ],
    name: "New Teams",
    bg: "bgYellow",
    nameStyle: "teamTitleBlack",
  },
];

const promos: Promo[] = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    title: "Nike store",
    amount: "-27.50",
    sub: "6 months of promotions",
    time: "11:00AM",
  },
];
const notifies: Notify[] = [
  {
    text: "All your notifications are well turned on",
    icon: "🔔",
    count: 3,
  },
];

const weatherCards: WeatherCardType[] = [
  {
    type: "landscape",
    avatar:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=64&h=64",
    title: "Landscape",
    desc: "423Km",
    menu: true,
    bg: "bgLightYellow",
  },
  {
    type: "mountain",
    avatar:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=64&h=64",
    title: "Falset Mountains",
    desc: "423Km, 3 Week",
    icon: "🌤️",
  },
  {
    type: "schedule",
    icon: "🌟",
    title: "Great day to schedule",
    desc: "Lorem ipsum dolor sitamet.",
    play: true,
    bg: "bgLightBlue",
  },
  {
    type: "weatherWeek",
    days: [
      { icon: "🌧️", label: "Mon" },
      { icon: "⛅", label: "Tue" },
      { icon: "☀️", label: "Wed" },
      { icon: "⛅", label: "Thu" },
      { icon: "🌦️", label: "Fri" },
    ],
  },
  {
    type: "seattle",
    title: "Seatle",
    desc: "Cloudy",
    temp: "32°",
    icon: "⛅",
    bg: "bgRed",
  },
  {
    type: "scheduleWeek",
    title: "Great day to schedule",
    desc: "Your usual hours",
    menu: true,
    days: [
      { icon: "🌧️", label: "Mon", time: "02:27 PM" },
      { icon: "⛅", label: "Tue", time: "09:00 AM" },
      { icon: "☀️", label: "Wed", time: "07:30 PM" },
      { icon: "⛅", label: "Thu", time: "12:00 PM" },
      { icon: "🌦️", label: "Fri", time: "06:00 PM" },
    ],
  },
  {
    type: "calendar",
    month: "Jun",
    day: "23",
    weekday: "Wednesday",
    time: "08:00 PM - 18:30 PM",
  },
];

function App() {
  return (
    <div className="app-main-container">
      {/* Task 1 */}
      <Section>
        <Button type={"primary"} label={"Started"} rightIcon={<ArrowRight />} />
        <Button type={"primary"} leftIcon={<Youtube />} label={"Youtube"} />
        <Button type={"outline"} leftIcon={<Facebook />} label={"Facebook"} />
        <Button type={"outline"} leftIcon={<Apple />} label={"Apple"} />
      </Section>

      {/* Task 2 */}
      <Section>
        <Input leftIcon={<Search />} placeholder={""} />
        <Input leftIcon={<Search />} placeholder={"Search"} />
        <Input leftIcon={<Search />} placeholder={"Textfield"} type="bold" />
        <Input
          leftIcon={<Search />}
          placeholder={"Search in web"}
          rightIcon={<Menu />}
        />
        <Input
          leftIcon={<Search />}
          placeholder={"Search Crypto"}
          rightIcon={<Settings2 />}
        />
        <Input
          leftIcon={"   "}
          placeholder={"Phone Number"}
          rightIcon={<Phone />}
        />
        <Input
          leftIcon={<Search />}
          placeholder={"Search in the web"}
          rightIcon={<Menu />}
        />
      </Section>

      {/* Task 3 */}
      <Section>
        <Football {...footballData} />
      </Section>

      {/* Task 4 */}
      <Section>
        <ContactCards contacts={contacts} />
      </Section>

      {/* Task 5 */}
      <Section>
        <TeamsCards teams={teams} />
      </Section>

      {/* Task 6 */}
      <Section>
        <PromoNotifyCards promos={promos} notifies={notifies} />
      </Section>
      {/* Task 7 */}
      <Section>
        <WeatherCards cards={weatherCards} />
      </Section>
    </div>
  );
}

export default App;
