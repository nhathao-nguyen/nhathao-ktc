import Section from "./components/Lesson04/AbContainer/Section";
import State01 from "./components/Lesson04/State01/State01";
import Rate from "./components/Lesson04/Rate/Rate";
import { SlideWithThumb } from "./components/Lesson04/SlideWithThumb/SlideWithThumb";
import TabsButton from "./components/Lesson04/TabButtons/TabsButton";

const imgSlideWithThumb = [
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1016/600/400",
  "https://picsum.photos/id/1018/600/400",
  "https://picsum.photos/id/1019/600/400",
];

const tabData = [
  {
    label: "HISTORY",
    content:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit...",
  },
  {
    label: "APPROACH",
    content:
      "Approach content: omnis voluptas assumenda est, omnis dolor repellendus...",
  },
  {
    label: "CULTURE",
    content:
      "Culture content: temporibus autem quibusdam et aut officiis debitis aut rerum...",
  },
  {
    label: "METHOD",
    content:
      "Method content: saepe eveniet ut et voluptates repudiandae sint et molestiae...",
  },
];

function App() {
  return (
    <div className={"bg-white"}>
      <Section>
        <State01 />
      </Section>
      <Section>
        <Rate />
      </Section>
      <Section>
        <h1 className="text-2xl font-bold mb-6 text-left">Slide with thumb</h1>
        <SlideWithThumb images={imgSlideWithThumb} />
      </Section>
      <Section>
        <h1 className="text-2xl font-bold mb-6 text-left">Button Tabs</h1>
        <TabsButton tabs={tabData} />
      </Section>
    </div>
  );
}

export default App;
